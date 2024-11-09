"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './faq.css'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import homebanner from '/homebanner.svg';
import { useState } from 'react';

// Import MediaPipe modules
import { FaceDetector, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function Motion() {

  // 
  // payment terms logic 
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [msg, setMSG] = React.useState("");
  const timer = React.useRef(undefined);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
// handling controller

// 
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 500);
    }
  };
  //  logic
  const [open, setOpen] = React.useState(false);
  const videoRef = React.useRef(null);  // Reference for the video element
  let controller = new AbortController();
  let [webCamReady, setWebCamReady] = React.useState(false);

  // const [nameNewFace, setNameNewFace] = useState("");
  // const [qtdRequestes, setqtdRequestes] = useState(0);
  // const [fileLoaded, setFileLoaded] = useState(false);

  let faceDetector;
  let runningMode = "IMAGE";  // Default mode for face detection

  // Initialize the face detector
  const initializeFaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: "GPU",  // Set GPU as the delegate for faster processing
      },
      runningMode: runningMode,  // Set the running mode
    });
  };


  // Start webcam and face detection
  
  const startWebcamAndDetection = async () => {
    await initializeFaceDetector(); // Initialize face detector

    const constraints = { video: true };  // Request video from user's webcam

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;  // Stream webcam to video element
      }

      videoRef.current.addEventListener("loadeddata", predictWebcam);  // Start detection when data is loaded
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const recognizeFace = async (imageSrc = None, clientIpAddressAux, enviromentNameAux, apiURLAux, nameNewFaceAux) => {
    try {
        // setqtdRequestes(prev => prev + 1);
        // setstatusSubmition("sending....");
        const response = await fetch(
            `${apiURLAux}/api/recognize_face_v2?key_enviroment_url=${enviromentNameAux}&ipaddress=${clientIpAddressAux}`,
            {
                body: JSON.stringify({
                    imageToRecognize: imageSrc,
                    nameNewFace: nameNewFaceAux
                }),

                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                signal: controller.signal
            }
        );
        // setqtdResponses(prev => prev + 1);
        if (!response.ok) {
            //throw new Error("Failed to fetch data");
            // setstatusSubmition("error");
        }
        else {
            const data = await response.json()
            if (data.lastRegonizedFaces.length == 1) {
              setMSG(`Payment Successful by ${data.lastRegonizedFaces[0].name}`);
              console.log("Payment Completed");
            }else{
              console.log("Payment rejected")
              setMSG("Payment rejected");
              
              
            }
            console.log(data);
            // setstatusSubmition(data.lastRegonizedFaces.length > 0 ? "Sucess on registration" : "Please try Again. No face detected.");
            // setListFacesLastRecognized(prev => data.lastRegonizedFaces);
            // setDataTable(data.faces_know);
        }
        

    } catch (error) {
        console.error(error);
        // setstatusSubmition("catch error");
    }
};

  // Capture image as base64 when pay-button is pressed
  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL("image/png");

    const jsonData = JSON.stringify({ image: base64Image });
    console.log(jsonData);  // Logs the base64 encoded image JSON data
  };

  

  // Predict faces in the webcam stream
  let lastVideoTime = -1;  // Store last processed frame time
  const predictWebcam = async () => {
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await faceDetector.setOptions({ runningMode: "VIDEO" });
    }

    let startTimeMs = performance.now();

    if (videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      const detections = (await faceDetector.detectForVideo(videoRef.current, startTimeMs)).detections;

      // Show or hide the payment container based on face detections
      if (detections.length > 1) {
        console.log("More than 1 face detected");
        document.querySelector(".payment-container").style.display = "none";
      } else if (detections.length === 1) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
    
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/png");

        await recognizeFace(base64Image, "127.0.0.1", "matera", "https://dev_face_recognitino_api.19860515.xyz", "henrique");
        document.querySelector(".payment-container").style.display = "block";
      } else {
        document.querySelector(".payment-container").style.display = "none";
      }
    }

    window.requestAnimationFrame(predictWebcam);  // Keep the video stream processing
  };

  // function to call make visible webcam-video element
  function displayWebcam() {
    document.querySelector(".webcam-video").style.display = "block";  // Display the webcam video element
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      startWebcamAndDetection();  // Start webcam and face detection when dialog opens
    }
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, [open]);

  return (
    <React.Fragment>
      <section className='section_modal'>
        <div className='modals'>
          <div>
            <h2 className='demo_text'>Demo Dashboard</h2>
            <img src={homebanner} className="logo invoice_img" alt="Vite logo" />
          </div>
        </div>
        <div className='modals_demo'>
          <div>
            <h2 className='livedemo_text'>Try a Live Demo of Facial Payment!</h2>
            <p className='text_demo'>
              Experience the future of payments with our facial recognition technology. Click the button below to test a secure and touchless payment experience. Simply allow access to your webcam, scan your face, and see how quick and easy it is to authorize a transaction. No passwords or cards needed—just your smile! 😊
            </p>
            <p className='nb_demo'>Note: This is a demo version; no real payments will be processed.</p>

            <Button variant="outlined" onClick={handleClickOpen}>Pay Now</Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Look directly at the camera for facial recognition to authorize the transaction.
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                
                <video ref={videoRef} autoPlay muted className="webcam-video" style={{ width: '100%', height: 'auto', display: 'none' }}></video>
                <div class="container">
                  <div className="payment-container">
                    <div className="payment-info">
                    <p className='face_veri'>
                Face Verification in Progress. Please align your face within the frame to continue with the payment process
                </p>
                      <h3>Total</h3>
                      <p>$123.00</p>
                      <p> Paymet</p>
                  </div>
                  <div className="pay-button-container">
                    {/* <button class="pay-button">Pay by face</button> */}
                    {/* <Button autoFocus onClick={() => { captureImage(); }}>PAY BY FACE</Button> */}
                  </div>
                  </div>
               </div>
               <p className='error'>{msg} </p>
               <Button autoFocus onClick={() => { captureImage(); }}>PAY BY FACE TEST</Button>
               
              </DialogContent>
              <DialogActions>
                {/* <Button autoFocus onClick={() => { captureImage(); }}>Capture</Button> */}
                <Button autoFocus onClick={() => { handleClose(); }}>
                  Payment Completed
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={() => {
            displayWebcam()
            handleButtonClick();
          }}
        >
          {success ? <CheckIcon /> : <AdminPanelSettingsIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={() => {
            displayWebcam()
            handleButtonClick();
          }}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
                {/* <Button autoFocus onClick={() => { displayWebcam(); }}>ENABLE PAYMENT</Button> */}
              </DialogActions>
            </BootstrapDialog>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

