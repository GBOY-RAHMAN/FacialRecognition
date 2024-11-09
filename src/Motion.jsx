import * as React from 'react';
import './faq.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import homebanner from '/homebanner.svg'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Motion() {
  // Progess javascript
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
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

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  // 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >
      <section className='section_modal'>
    <div className='modals'>
          <div> 
            <h2 className='demo_text'>Demo Dashboard</h2>
            <img src={homebanner } className="logo invoice_img" alt="Vite logo" />
            <div></div>
          
          </div>
          </div> 
       <div className='modals_demo'>
         <div> 
            <h2 className='livedemo_text'>Try a Live Demo of Facial Payment!</h2>
            <p className='text_demo'>Experience the future of payments with our facial recognition technology. Click the button below to test a secure and touchless payment experience. Simply allow access to your webcam, scan your face, and see how quick and easy it is to authorize a transaction. No passwords or cards needed—just your smile! 😊

           </p> <p className='nb_demo'>Note: This is a demo version; no real payments will be processed.</p>

           <Button variant="outlined" onClick={handleClickOpen}>
        Pay Now
      </Button>
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
          <Typography gutterBottom> 
            POP UP COMING SOON
            Look directly at the camera for facial recognition to authorize the transaction
           
          </Typography>
          <Typography gutterBottom>
          Please align your face within the frame to proceed with payment
          </Typography>
          <Typography gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis praesentium, asperiores cupiditate esse illum molestias ipsum dolores obcaecati quasi laborum. Aspernatur, quae pariatur sint neque quis nam officiis quod sit?
          Look directly at the camera for facial recognition to authorize the transaction
          </Typography>
        </DialogContent>
        <DialogActions>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
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
          onClick={handleButtonClick}
        >
          Accept Payment
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
        </DialogActions>
      </BootstrapDialog>
         <div>

        </div>
          
          </div>
          </div> 
   
   
    
  </section>
    </React.Fragment>
  );
}
