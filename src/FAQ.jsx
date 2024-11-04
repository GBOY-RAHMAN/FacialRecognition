import React from 'react'
import './Faq.css'


export default function FAQ() {
  return (
    <>
    <div className='container_faq'>
    <section className='faq'>
  
  <h1 className='faq_title'>Frequently Asked Questions</h1>
 <div className='faq_dropper'>
  <section className='quote'> 
    <p className='questions_section'>How does facial recognition payment work? </p>
    <p className='questions_answer'>Facial recognition payment uses advanced AI algorithms to verify your identity by analyzing your facial features. When you authorize a payment, the system quickly scans your face, matches it with your registered profile, and confirms your identity before processing the transaction.

</p></section>
<section className='quote'> 
    <p className='questions_section'>Is my personal data secure? </p>
    <p className='questions_answer'>Yes, we prioritize your security and privacy. Our system encrypts all facial data, ensuring it is protected from unauthorized access. Additionally, your data is stored in compliance with industry standards, keeping your information safe and private.

</p></section>
<section className='quote'> 
    <p className='questions_section'>Can someone else use my photo to make a payment? </p>
    <p className='questions_answer'>No, the system is designed to detect and reject attempts to use photos, videos, or masks. It only works with live facial recognition, so your payment can only be authorized when you are present and actively using the system.

</p></section>
</div>
</section>
    </div>

     
    </>
  )
}
