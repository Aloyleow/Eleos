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

function App() {
  const [imageHost] = useState(hostImage)
  const [imageEvents] = useState(eventImage)
  const [countries] = useState(countrys)
  const [types] = useState(serviceTypes)
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

  const handleHomePage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setUser(null);
    setType(null);
  }

  useEffect (() => {
    if (type) {localStorage.setItem("type", type)}
  })

  
  
  return (
    <>
      {!user && <Navbar />}
      {type === "user" && <NavBarUser handleSignOut={handleSignOut}/>}
      {type === "host" && <NavBarHost handleSignOut={handleSignOut}/>}
      <Routes>
        <Route path='/' element={<HomePage handleHomePage={handleHomePage}/>} />
        <Route path='/login' element={<LoginPage setUser={setUser} setType={setType}/>} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signup/host" element={<SignUpPageHost imageHost={imageHost} countries={countries}/>}/>
        <Route path='/events' element={<EventsPage countries={countries} types={types}/>} />
        <Route path='/organisations' element={<OrganisationsPage />} />
        <Route path='/about' element={<AboutPage/>}/>
        {user && type === "user" ? (
          <>
            <Route path='/user' element={<UserPage />} />
            <Route path='/user/history' element={<UserEventHistoryPage/>}/>
            <Route path='/event/:eventsid' element={<EventsDetailPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
        {user && type === "host" ? (
          <>
            <Route path='/host' element={<HostPage/>} />
            <Route path='/host/history' element={<HostEventHistoryPage/>} />
            <Route path='/host/create' element={<CreateEventPage imageEvents={imageEvents} countries={countries} types={types}/>}/>
            <Route path='/host/:eventsid/edit' element={<EditEventPage imageEvents={imageEvents}/>}/>
            <Route path='/event/:eventsid' element={<EventsDetailPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
      </Routes>
    </>

  )
}
export default App
