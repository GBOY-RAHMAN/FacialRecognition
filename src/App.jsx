import { useState } from 'react'
import reactLogo from './assets/react.svg'
import faceImage from '/face.png'
import faceprint from '/faceprint.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='big-container'>
    <section className='holder_section'>
    <div className='title_heading'>
      <h1 className='title_heading_first'>Secure Payments, Simplified with Facial Recognition</h1>
      <p className='title_body'>Experience the future of secure, seamless payments. Our facial recognition payment system is designed to make transactions faster, safer, and more convenient. With just a glance, you can authorize payments and complete transactions, without the need for passwords, pins, or cards. Dive into the world of next-generation payment technology today.</p>
    </div>

    <div className='box'><img src={faceImage} className="logo" alt="Vite logo" />
    
    </div>
    
   
</section>
</div>

    
    
    </>
  )
}

export default App
