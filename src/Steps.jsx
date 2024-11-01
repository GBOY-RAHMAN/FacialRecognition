import React from 'react'
import './comptcss.css'
import setup from '/setup.svg'
import secure from '/secure.svg'
import verify from '/verify.svg'
import linkpayment from '/credit_card.svg'
import confirmPayment from '/confirmPayment.svg'


export default function steps() {
  return (
    <>
      
      <section class="image-scroll-section">
          
            <div class="image-scroll-wrapper">

                <div class="wrapper" id="first_item"></div>

                <div class="rf-hcard-content" > 
                    <h3 class="rf-recommcard-content-title"><span data-index="2">Create Your Profile</span></h3>
                   <div class="rf-recommcard-content-img"> 
                   <img src={setup} className="rf-hcard-img" alt="Vite logo"  />
                    </div>
                    <div class="rf-recommcard-content-info">
                        
                        
                            
                            <div className="rf-watch-content">
                            <span>sign up online to create your secure payment profile. You’ll be prompted to upload a facial scan, which will serve as your unique identifier.ßß.*</span>
                    
                        </div></div>
                </div>
                <div class="rf-hcard-content payment" > 
                    <h3 class="rf-recommcard-content-title"><span data-index="2">Link Your Payment Method</span></h3>
                   <div class="rf-recommcard-content-img"> 
                   <img src={linkpayment} className="rf-hcard-img" alt="Vite logo"  />
                    </div>
                    <div class="rf-recommcard-content-info">
                        
                        
                            
                            <div className="rf-watch-content">
                            <span>Connect your preferred payment option, whether it’s a credit card, debit card, or digital wallet. All details are securely encrypted for maximum privacy.</span>
                    
                        </div></div>
                </div>
                <div class="rf-hcard-content secure" > 
                    <h3 class="rf-recommcard-content-title"><span data-index="2" className='secureitem'>Secure Your Data</span></h3>
                   <div class="rf-recommcard-content-img"> 
                   <img src={secure} className="rf-hcard-img" alt="Vite logo"  />
                    </div>
                    <div class="rf-recommcard-content-info">
                        
                        
                            
                            <div className="rf-watch-content">
                            <span className='secureitem'>During setup, your facial data is converted to a unique, encrypted code stored on our secure servers, ensuring no raw images are saved...</span>
                    
                        </div></div>
                </div>
                <div class="rf-hcard-content" > 
                    <h3 class="rf-recommcard-content-title"><span data-index="2">Verify Your Identity</span></h3>
                   <div class="rf-recommcard-content-img"> 
                   <img src={verify} className="rf-hcard-img" alt="Vite logo"  />
                    </div>
                    <div class="rf-recommcard-content-info">
                        
                        
                            
                            <div className="rf-watch-content">
                            <span>Simply look at your device or point-of-sale screen to verify your identity. Our advanced facial recognition technology instantly confirms it’s you</span>
                    
                        </div></div>
                </div>

                
                <div class="rf-hcard-content secure" > 
                    <h3 class="rf-recommcard-content-title"><span data-index="2" className='secureitem'>Confirm Your Purchase</span></h3>
                   <div class="rf-recommcard-content-img"> 
                   <img src={confirmPayment} className="rf-hcard-img" alt="Vite logo"  />
                    </div>
                    <div class="rf-recommcard-content-info">
                        
                        
                            
                            <div className="rf-watch-content">
                            <span className='secureitem'>Once verified, your payment is instantly processed. You’ll see a confirmation on your screen without needing to enter any additional information.</span>
                    
                        </div></div>
                </div>
            <div class="wrapper" id="first_item"></div>
            </div>
        
    
        </section>
    </>
  )
}
