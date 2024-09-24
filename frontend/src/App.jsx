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
import eleos from './images/eleos.jpg'
import fourPoints from './images/fourPoints.jpg'
import freedom from './images/freedom.jpg'
import givingOuts from './images/givingOuts.jpg'
import morningCross from './images/morningCross.jpg'
import cleaningupEvent from './images/cleaningupEvent.jpg'
import cookingEvent from './images/cookingEvent.jpg'
import elderlyEvent from './images/elderlyEvent.jpg'
import religiousEvent from './images/religiousEvent.jpg'


function App() {
  const [imageHost] = useState([eleos, fourPoints, freedom, givingOuts, morningCross])
  const [imageEvents] = useState([cleaningupEvent, cookingEvent, elderlyEvent, religiousEvent])
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
        <Route path="/signup/host" element={<SignUpPageHost imageHost={imageHost}/>}/>
        <Route path='/events' element={<EventsPage />} />
        <Route path='/organisations' element={<OrganisationsPage />} />
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
            <Route path='/host/create' element={<CreateEventPage imageEvents={imageEvents}/>}/>
            <Route path='/host/:eventsid/edit' element={<EditEventPage/>}/>
          </>) : <Route path='/' element={<HomePage />} />}
      </Routes>
    </>

  )
}
export default App
