import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Dashboard from './Dashboard'
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
import EditRoom from './Pages/EditRoom'
import Profile from './Pages/Profile'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<HomePage/>} />
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/support" element={
        <ProtectedRoute>
        <SupportPage />
        </ProtectedRoute>} />
      <Route path="/support/:requestId" element={
        <ProtectedRoute>
        <SupportRequestPage />
        </ProtectedRoute>} />
      <Route path="/rooms/:roomId/review" element={
        <ProtectedRoute>
        <ReviewForm />
        </ProtectedRoute>
        } />
      <Route path="/support/page" element={
        <ProtectedRoute>
        <SupportRequestForm/>
        </ProtectedRoute>}/>
      <Route path="/my-bookings" element={
        <ProtectedRoute>
        <MyBookings />
        </ProtectedRoute>} />
      <Route path="/edit-room/:roomId" element={
        <ProtectedRoute>
        <EditRoom/>
        </ProtectedRoute>
        } />
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
        <Route path="/browse-rooms" element={
          <ProtectedRoute>
          <RoomBrowser />
          </ProtectedRoute>} />
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
