import React, { useState } from 'react';
import './Faq.css'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';



export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // 

    const toggleAnswer = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  return (
    
    <>
    <div className='container_faq'>
    <section className='faq'>
  
  <h1 className='faq_title'>Frequently Asked Questions</h1>
 <div className='faq_dropper'>
  <section className='quote'> 
    <p className='questions_section'>How does facial recognition payment work?  <span className='icons_readmore' onClick={() => toggleAnswer(1)}>
                {openIndex === 1 ? <CloseIcon /> : <AddIcon />}
              </span> </p>
              {openIndex === 1 && (  <p className='questions_answer'>Facial recognition payment uses advanced  algorithms to verify your identity by analyzing your facial features. When you authorize a payment, the system quickly scans your face, matches it with your registered profile, and confirms your identity before processing the transaction.

</p>  )}  
    </section>
<section className='quote'> 
    <p className='questions_section'>Is my personal data secure? <span className='icons_readmore' onClick={() => toggleAnswer(2)}>
                {openIndex === 2 ? <CloseIcon /> : <AddIcon />}
              </span></p>
    
              {openIndex === 2 && (<p className='questions_answer'>Yes, we prioritize your security and privacy. Our system encrypts all facial data, ensuring it is protected from unauthorized access. Additionally, your data is stored in compliance with industry standards, keeping your information safe and private.

</p>)}</section>
<section className='quote'> 
    <p className='questions_section'>Can someone else use my photo to make a payment? <span className='icons_readmore' onClick={() => toggleAnswer(3)}>
                {openIndex === 3 ? <CloseIcon /> : <AddIcon />}
              </span>  </p>
              {openIndex === 3 && (  <p className='questions_answer'>No, the system is designed to detect and reject attempts to use photos, videos, or masks. It only works with live facial recognition, so your payment can only be authorized when you are present and actively using the system.

</p>
              )}</section>
  
  <section className='quote'> 
    <p className='questions_section'>What devices support facial recognition payments? <span className='icons_readmore' onClick={() => toggleAnswer(4)}>
                {openIndex === 4 ? <CloseIcon /> : <AddIcon />}
              </span>  </p>
              {openIndex === 4 && (  <p className='questions_answer'>Our technology is compatible with most modern smartphones, tablets, and devices with a front-facing camera and secure facial recognition capabilities. We recommend using devices updated to the latest OS version for optimal performance.

</p>
              )}</section>

  <section className='quote'> 
    <p className='questions_section'>How do I set up facial recognition payment? <span className='icons_readmore' onClick={() => toggleAnswer(5)}>
                {openIndex === 5 ? <CloseIcon /> : <AddIcon />}
              </span>  </p>
              {openIndex === 5 && (  <p className='questions_answer'>Simply download our app (or go to our website), create an account, and follow the steps to set up your facial profile. Once you’ve completed registration, you’ll be able to authorize payments with just a glance.

</p>
              )}</section>
  <section className='quote'> 
    <p className='questions_section'>What happens if I lose access to my account or device? <span className='icons_readmore' onClick={() => toggleAnswer(6)}>
                {openIndex === 6 ? <CloseIcon /> : <AddIcon />}
              </span>  </p>
              {openIndex === 6 && (  <p className='questions_answer'>In case of lost access, you can reset your account using traditional security methods such as a backup email or phone number. We also provide customer support to help you securely regain access.

</p>
              )}</section>

<section className='quote'> 
    <p className='questions_section'>Can I use this technology if I wear glasses or change my appearance? <span className='icons_readmore' onClick={() => toggleAnswer(7)}>
                {openIndex === 7 ? <CloseIcon /> : <AddIcon />}
              </span>  </p>
              {openIndex === 7 && (  <p className='questions_answer'>Our facial recognition technology is resilient to minor changes in appearance, such as wearing glasses, hairstyles, or facial hair. However, if you make significant changes to your appearance, you may need to update your profile to maintain accurate recognition.



</p>
              )}</section>
</div>
</section>
    </div>

     
    </>
  )
}
