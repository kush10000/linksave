import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home'
import Links from './pages/Links'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <GoogleOAuthProvider clientId={"463682886423-10at469n77c7rf95tj2p1k97frt85h5u.apps.googleusercontent.com"} >
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/links' element={<Links/>} />
        </Routes>
      </Router>
      </GoogleOAuthProvider>
    </>
  )
}

export default App