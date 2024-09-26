import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { verifyUser } from './services/verifyServices'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EventsPage from './pages/EventsPage'
import OrganisationsPage from './pages/OrganisationsPage'
import { useEffect, useState } from 'react'
import UserPage from './pages/UserPage'
import SignUpPageHost from './pages/SignUpPageHost'
import NavBarUser from './components/NavbarUser'
import NavBarHost from './components/NavbarHost'
import CreateEventPage from './pages/CreateEventPage'
import HostPage from './pages/HostPage'
import EventsDetailPage from './pages/EventsDetailPage'
import EditEventPage from './pages/EditEventPage'
import UserEventHistoryPage from './pages/UserEventHistoryPage'
import HostEventHistoryPage from './pages/HostEventHistory'
import { countrys } from './utilities/countries'
import { serviceTypes } from './utilities/serviceTypes'
import { hostImage, eventImage } from './utilities/images'
import AboutPage from './pages/AboutPage'
import HostEventDetailPage from './pages/HostEventDetailPage'

function App() {
  const [imageHost] = useState(hostImage)
  const [imageEvents] = useState(eventImage)
  const [countries] = useState(countrys)
  const [types] = useState(serviceTypes)
  const [error, setError] = useState(false)
  const [user, setUser] = useState(verifyUser())
  const [humanType, setHumanType] = useState(localStorage.getItem("type") || null)
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setUser(null);
    setHumanType(null);
    navigate('/');
  };

  const handleHomePage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setUser(null);
    setHumanType(null);
  }

  useEffect (() => {
    if (humanType) {localStorage.setItem("type", humanType)}
  })

  
  
  return (
    <>
      {!user && <Navbar />}
      {humanType === "user" && <NavBarUser handleSignOut={handleSignOut}/>}
      {humanType === "host" && <NavBarHost handleSignOut={handleSignOut}/>}
      <Routes>
        <Route path='/' element={<HomePage handleHomePage={handleHomePage}/>} />
        <Route path='/login' element={<LoginPage setUser={setUser} setHumanType={setHumanType}/>} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signup/host" element={<SignUpPageHost imageHost={imageHost} countries={countries}/>}/>
        <Route path='/events' element={<EventsPage countries={countries} types={types} user={user} humanType={humanType}/>} />
        <Route path='/organisations' element={<OrganisationsPage />} />
        <Route path='/about' element={<AboutPage/>}/>
        {user && humanType === "user" ? (
          <>
            <Route path='/user' element={<UserPage />} />
            <Route path='/user/history' element={<UserEventHistoryPage/>}/>
            <Route path='/event/:eventsid' element={<EventsDetailPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
        {user && humanType === "host" ? (
          <>
            <Route path='/host' element={<HostPage/>} />
            <Route path='/host/history' element={<HostEventHistoryPage/>} />
            <Route path='/host/create' element={<CreateEventPage imageEvents={imageEvents} countries={countries} types={types} error={error} setError={setError}/>}/>
            <Route path='/host/:eventsid/edit' element={<EditEventPage imageEvents={imageEvents}/>}/>
            <Route path='/event/:eventsid' element={<EventsDetailPage/>}/>
            <Route path='/event/host/:eventsid' element={<HostEventDetailPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
      </Routes>
      
    </>

  )
}
export default App
