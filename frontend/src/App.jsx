import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { verifyUser } from './services/verifyServices'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UpcomingPage from './pages/UpcomingPage'
import CommunitiesPage from './pages/CommunitiesPage'
import { useState } from 'react'
import UserPage from './pages/UserPage'
import SignUpPageHost from './pages/SignUpPageHost'


function App() {
  const [user, setUser] = useState(verifyUser())
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    localStorage.removeItem("token")
    setUser(null),
    navigate('/')
  }
  
  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signup/host" element={<SignUpPageHost />}/>
        <Route path='/upcoming' element={<UpcomingPage />} />
        <Route path='/communities' element={<CommunitiesPage />} />
        {user ? (
          <>
            <Route path='/user' element={<UserPage />} />
          </>) : <Route path='/' element={<HomePage />} />}
      </Routes>
    </>

  )
}
export default App
