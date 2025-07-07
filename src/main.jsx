import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import P2PLendingApp from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <P2PLendingApp />
  </StrictMode>,
)
