import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home'
import Links from './pages/Links'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css'
import ProtectRoute from './ProtectRoute';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function App() {

  return (
    <>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/links' element={<ProtectRoute><Links/></ProtectRoute>} />
        </Routes>
      </Router>
      </GoogleOAuthProvider>
    </>
  )
}

export default App