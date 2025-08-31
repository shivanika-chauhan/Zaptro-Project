import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'
import { DataProvider } from './Context/DataContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}cddcd

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DataProvider>
    <CartProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
        <ScrollToTop color='white' smooth style={{backgroundColor:'#fa2d37', display:'flex', alignItems:'center', justifyContent:'center'}}/>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ClerkProvider>
    </CartProvider>
  </DataProvider>
  // </StrictMode>,
)