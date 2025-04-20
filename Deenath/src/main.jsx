import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExceptionHandle from "../src/exc/Excpetionhandle";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExceptionHandle>
      <App />
    </ExceptionHandle>
  </StrictMode>,
)
