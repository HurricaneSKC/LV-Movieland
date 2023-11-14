import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import './index.css'
import App from './App'
import ModalProvider from './context/ModalContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </Provider>      
  </React.StrictMode>
)
