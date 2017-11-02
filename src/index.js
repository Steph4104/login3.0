import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GC_AUTH_TOKEN } from './constants'





ReactDOM.render(
  <BrowserRouter>

      <App />

  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker()

