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
import ReviewForm from './components/ReviewForm'
import SupportPage from './Pages/SupportPage'
import SupportRequestPage from './Pages/SupportRequestPage'
import SupportRequestForm from './components/SupportRequestForm'
import MyBookings from './Pages/MyBookings'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path="*" element={<HomePage/>} /> */}
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
<Route path="/support" element={<SupportPage />} />
<Route path="/support/:requestId" element={<SupportRequestPage />} />
<Route path="/rooms/:roomId/review" element={<ReviewForm />} />
<Route path="/support/page" element={<SupportRequestForm/>}/>
<Route path="/my-bookings" element={<MyBookings />} />
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
        // Add this to your existing routes
        // Add this to your existing routes
{/* <Route path="/rooms/:roomId" element={<RoomDetailPage />} /> */}
        <Route path="/book-room/:roomId" element={
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
