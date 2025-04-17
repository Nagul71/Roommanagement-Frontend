import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Dashboard from './Dashboard'
import AddRoomForm from './assets/RoomList/AddRoomForm'
import ProtectedRoute from './components/ProtectedRoute'
import RoomForm from './components/RoomForm'
import MyRooms from './Pages/MyRoom'
import RoomDashboard from './Pages/RoomDashboard'
import RoomDetail from './Pages/RoomDetail'
import BookingForm from './components/BookingForm'
import RoomBrowser from './Pages/RoomBrowser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path="*" element={<HomePage/>} /> */}
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/create-room" element={
          <ProtectedRoute>
            <RoomDashboard/>
          </ProtectedRoute>
        } />
        <Route path="/my-rooms" element={
          <ProtectedRoute>
            <MyRooms />
          </ProtectedRoute>
        } />

<Route path="/addroom" element={
          <ProtectedRoute>
            <RoomForm/>
          </ProtectedRoute>
        } />
        <Route path="/rooms/:roomId" element={
          <ProtectedRoute>
            <RoomDetail />
          </ProtectedRoute>
        } />
        <Route path="/browse-rooms" element={<RoomBrowser />} />
        <Route path="/book-room" element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
