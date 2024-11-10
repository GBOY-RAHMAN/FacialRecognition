import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Component from './Component.jsx'
import Howitworks from './Howitworks.jsx'
import Steps from './Steps.jsx'
import Fraudprvention from './Fraudprvention.jsx'
import FAQ from './FAQ.jsx'
import Motion from './Motion.jsx'
import Angelo from './Angelo.jsx'
import Motion2 from './Motion2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
    <App />
    <Howitworks />
    <Motion2/>
    <Steps/>
   
   <FAQ />
  <Angelo/>
  </StrictMode>,
  
)
