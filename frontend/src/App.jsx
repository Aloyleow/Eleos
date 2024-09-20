import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UpcomingPage from './pages/UpcomingPage'
import CommunitiesPage from './pages/CommunitiesPage'

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = '/' element = {<HomePage/>}/>
      <Route path = '/login' element = {<LoginPage/>}/>
      <Route path = "/signup" element = {<SignUpPage/>}/>
      <Route path = '/upcoming' element = {<UpcomingPage/>}/>
      <Route path = '/communities' element = {<CommunitiesPage/>}/>
    </Routes>
    </>
  
)}
export default App
