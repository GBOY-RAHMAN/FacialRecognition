import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import './comptcss.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export default function Howitworks() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <section className='container_hwt'>
    <section className='section_howitwork'>
    <h1 className='header_prp'>
        How it works 
    </h1>
    <p className='para_hw'>Imagine a world where payments are as easy as a glance. Our facial recognition payment technology eliminates the need for cash, cards, or complex passwords, providing you with a seamless and secure checkout experience. Simply set up your profile, confirm with a look, and enjoy instant access to your purchases. Here’s how it works in three simple steps:</p>
     
    </section>
  {/* <div className='invoice'>
   <div className='container_invoices'>

      <section className='cover_items'>
        
        <h2 className='demo_invoice'>Bill Summary</h2>
        <div className='item1'>
          <div className='item_desc'><p> Boot Grey 368-Cb</p><p>60$</p></div>
          
        </div>
        <div className='item1'>
          <div className='item_desc'><p> Boot Grey 368-Cb</p><p>60$</p></div>
          
        </div>
        <div className='item1'>
          <div className='item_desc'><p> Boot Grey 368-Cb</p><p>60$</p></div>
          
        </div>
        <div className='item1'>
          <div className='item_desc'><p> Boot Grey 368-Cb</p><p>60$</p></div>
          
        </div>
        <React.Fragment >
      <section className='section_modal'>
        <div className='modals'>
          <div> 
            <h2>Demo Invoice</h2>
            <div></div>
          
       </div> */}
         

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
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      </div>
      </section>
    </React.Fragment>
        </section>
      </div>
      
     </div>

     
    </section>
    </>

  )
}
