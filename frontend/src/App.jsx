import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { verifyUser } from './services/verifyServices'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UpcomingPage from './pages/UpcomingPage'
import OrganisationsPage from './pages/OrganisationsPage'
import { useEffect, useState } from 'react'
import UserPage from './pages/UserPage'
import SignUpPageHost from './pages/SignUpPageHost'
import NavBarUser from './components/NavbarUser'
import NavBarHost from './components/NavbarHost'
import CreateEventPage from './pages/CreateEventPage'
import HostPage from './pages/HostPage'


function App() {
  const [user, setUser] = useState(verifyUser())
  const [type, setType] = useState(localStorage.getItem("type") || null)
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setUser(null);
    setType(null);
    navigate('/');
  };

  useEffect (() => {
    if (type) {localStorage.setItem("type", type)}
  })
  
  return (
    <>
      {!user && <Navbar />}
      {type === "user" && <NavBarUser handleSignOut={handleSignOut}/>}
      {type === "host" && <NavBarHost handleSignOut={handleSignOut}/>}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage setUser={setUser} setType={setType}/>} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signup/host" element={<SignUpPageHost />}/>
        <Route path='/upcoming' element={<UpcomingPage />} />
        <Route path='/organisations' element={<OrganisationsPage />} />
        {user && type === "user" ? (
          <>
            <Route path='/user' element={<UserPage />} />
          </>) : <Route path='/' element={<HomePage />} />}
        {user && type === "host" ? (
          <>
            <Route path='/host' element={<HostPage/>} />
            <Route path='/host/create' element={<CreateEventPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
      </Routes>
    </>

  )
}
export default App
