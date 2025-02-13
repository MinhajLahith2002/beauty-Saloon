import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ServiceProvider } from './context/ServiceContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ServiceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceProvider>
)
