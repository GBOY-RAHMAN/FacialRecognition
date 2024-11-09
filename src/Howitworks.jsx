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
 

     
    </section>
    </>

  )
}
