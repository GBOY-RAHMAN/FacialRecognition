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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Motion() {
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
          Complete Payment 
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum obcaecati vero expedita nulla, reprehenderit vel libero laudantium! Eligendi quo tempora eveniet, exercitationem, earum minus consequuntur, incidunt harum reiciendis provident amet.
           
          </Typography>
          <Typography gutterBottom>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis praesentium, asperiores cupiditate esse illum molestias ipsum dolores obcaecati quasi laborum. Aspernatur, quae pariatur sint neque quis nam officiis quod sit?
          </Typography>
          <Typography gutterBottom>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum non eos soluta perferendis esse aperiam distinctio ut quidem sunt obcaecati officiis, iure sapiente atque, asperiores commodi, delectus iste sit aut?
          </Typography>
          <Typography gutterBottom>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum non eos soluta perferendis esse aperiam distinctio ut quidem sunt obcaecati officiis, iure sapiente atque, asperiores commodi, delectus iste sit aut?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Payment Completed
          </Button>
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
