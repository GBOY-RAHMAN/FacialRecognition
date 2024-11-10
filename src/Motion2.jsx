/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";
import { green } from "@mui/material/colors";
import "./Faq.css";
import { styled } from "@mui/material/styles";
import { useState, Fragment, useEffect, useRef } from "react";
import "./Motion2.css";
import matera_logo from '/matera_logo.svg'
// Import MediaPipe modules
import {
  FaceDetector,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

export default function Motion2() {
  const [amountToPay, setAmountToPay] = useState(100.00);
  const videoRef = useRef(null);
  const demosSection = useRef(null);
  let controller = new AbortController();
  const [msg, setMSG] = React.useState({
    msg: "Waiting pay by face",
    type: 0,
  });
  const [paymentRequested, setPaymentRequested] = useState(false);
  const valueRef = useRef(null);
  let faceDetector;
  let runningMode = "VIDEO";

  const enableWebcamButton = useRef(null);
  const liveViewRef = useRef(null);
  const [detections, setDetections] = useState([]);
  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  // Keep a reference of all the child elements we create
  // so we can remove them easily on each render.
  var children = [];

  useEffect(() => {
    // Initialize the object detector
    const initializefaceDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: "GPU",
        },
        runningMode: runningMode,
      });
      demosSection.current.classList.remove("invisible");

      // If webcam supported, add event listener to button for when user
      // wants to activate it.
      if (hasGetUserMedia()) {
        //enableWebcamButton = document.getElementById("webcamButton");
        enableWebcamButton.current.addEventListener("click", enableCam);
      } else {
        console.warn("getUserMedia() is not supported by your browser");
      }

      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };

    initializefaceDetector();
  }, []);

  // Enable the live webcam view and start detection.
  async function enableCam(event) {
    if (!faceDetector) {
      alert("Face Detector is still loading. Please try again..");
      return;
    }
    setMSG({ msg: "System ready to accept requests", type: 0 });
    // Hide the button.
    enableWebcamButton.current.classList.add("removed");

    // getUsermedia parameters
    const constraints = {
      video: true,
    };

    // Activate the webcam stream.
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  let lastVideoTime = -1;
  async function predictWebcam() {
    let startTimeMs = performance.now();

    // Detect faces using detectForVideo
    if (videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      const detections2 = faceDetector.detectForVideo(
        videoRef.current,
        startTimeMs
      ).detections;
      setDetections(detections2);
      if(detections2.length > 1){
        setMSG({
          msg: "Make sure you are the only one in the webcam",
          type: 0,
        })
      }
      // else{
      //   setMSG({
      //     msg: "Align your face",
      //     type: 0,
      //   })
      // }
      
      displayVideoDetections(detections2);
    }

    // Call this function again to keep predicting when the browser is ready
    window.requestAnimationFrame(predictWebcam);
  }

  useEffect(() => {
    const x = async () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL("image/png");

      let data = await recognizeFace(
        base64Image,
        "127.0.0.1",
        "matera",
        "https://face_recognitino_api.19860515.xyz"
      );
      console.log("resultado", data);
    };
    if (detections.length == 1 && paymentRequested) {
      x();
    } else {
      //setMSG("System ready to accept requests...");
    }
  }, [detections]);

  function displayVideoDetections(detections) {
    // Remove any highlighting from previous frame.
    for (let child of children) {
      liveViewRef.current.removeChild(child);
    }
    children.splice(0);

    // Iterate through predictions and draw them to the live view
    for (let detection of detections) {
      const p = document.createElement("p");
      p.innerText =
        "Confidence: " +
        Math.round(parseFloat(detection.categories[0].score) * 100) +
        "% .";
      p.style =
        "left: " +
        (videoRef.current.offsetWidth -
          detection.boundingBox.width -
          detection.boundingBox.originX) +
        "px;" +
        "top: " +
        (detection.boundingBox.originY - 30) +
        "px; " +
        "width: " +
        (detection.boundingBox.width - 10) +
        "px;";

      const highlighter = document.createElement("div");
      highlighter.setAttribute("class", "highlighter");
      highlighter.style =
        "left: " +
        (videoRef.current.offsetWidth -
          detection.boundingBox.width -
          detection.boundingBox.originX) +
        "px;" +
        "top: " +
        detection.boundingBox.originY +
        "px;" +
        "width: " +
        (detection.boundingBox.width - 10) +
        "px;" +
        "height: " +
        detection.boundingBox.height +
        "px;";

      liveViewRef.current.appendChild(highlighter);
      liveViewRef.current.appendChild(p);

      // Store drawn objects in memory so they are queued to delete at next call
      children.push(highlighter);
      children.push(p);
      for (let keypoint of detection.keypoints) {
        const keypointEl = document.createElement("span");
        keypointEl.className = "key-point";
        keypointEl.style.top = `${
          keypoint.y * videoRef.current.offsetHeight - 3
        }px`;
        keypointEl.style.left = `${
          videoRef.current.offsetWidth -
          keypoint.x * videoRef.current.offsetWidth -
          3
        }px`;
        liveViewRef.current.appendChild(keypointEl);
        children.push(keypointEl);
      }
    }
  }

  const recognizeFace = async (
    imageSrc,
    clientIpAddressAux,
    enviromentNameAux,
    apiURLAux
  ) => {
    try {
      setMSG({ msg: "Recognition initiated....", type: 0 });
      setPaymentRequested(false);
      const response = await fetch(
        `${apiURLAux}/api/recognize_face_v2?key_enviroment_url=${enviromentNameAux}&ipaddress=${clientIpAddressAux}`,
        {
          body: JSON.stringify({
            imageToRecognize: imageSrc,
          }),

          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          signal: controller.signal,
        }
      );
      if (!response.ok) {
        //throw new Error("Failed to fetch data");
        // setstatusSubmition("error");
      } else {
        const data = await response.json();
        if (data.lastRegonizedFaces.length == 1) {
          //setMSG(`Payment Successful by ${data.lastRegonizedFaces[0].name}`);
          setMSG({
            msg: `Customer recognized as ${data.lastRegonizedFaces[0].name}`,
            type: 1,
            fontFamily: "Poppins",
          });
          setTimeout(() => {
            setMSG({ msg: "Payment succefull", type: 1 });
          }, 2000);
        } else {
          setTimeout(() => {
            setMSG({
              msg: "Costumer not recognized. Payment rejected",
              type: 2,
            });
          }, 300);
          // setMSG("Payment rejected");
        }

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="section_modal">
      <div>
        <h1 className="header_section">
          Look directly at the camera for facial recognition to authorize the
          transaction.
        </h1>

        <section ref={demosSection} className="invisible">
          <div ref={liveViewRef} className="videoView">
            <video ref={videoRef} autoPlay playsInline></video>
          </div>
        </section>
      </div>
      <section>
        <button
          ref={enableWebcamButton}
          className="mdc-button mdc-button--raised"
        >
          <span className="mdc-button__ripple"></span>
          <span className="mdc-button__label">Enable Pay By Face</span>
        </button>

       

        <button
          onClick={() => setPaymentRequested(true)}
          disabled={detections.length == 0}
          className='request-payment'
        >
          Request Payment
        </button>
        <a href="https://face-login-ui.vercel.app/selfregister?api_url=https://face_recognitino_api.19860515.xyz&enviroment_name=matera" target="_blank">
          <button className="register-button">Register A New Face</button>
        </a>
       { <div className="container">
          <div className="payment-container">
            <div className="payment-info">
              <p className="face_veri">
                Face Verification in Progress. Please align your face within the
                frame to continue with the payment process
              </p>
              <h3>Total</h3>
              <p><input type="text" value={amountToPay} onChange={(e)=>setAmountToPay(e.target.value)} /></p>
              <p> Paymet</p>
            </div>
          </div>
        </div>}
        <p className="output-message"
          style={{
            backgroundColor:
              msg.type == 0 ? "#3B538E" : msg.type == 1 ? "green" : "red",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          {msg.msg}
        </p>
        <i>
        *payment powerd by:</i> <img style={{backgroundColor:"black"}} width={100} src={matera_logo}></img>
        
      </section>
    </section>
  );
}
