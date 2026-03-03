import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Layout from './layout/Layout'
import Settings from './pages/Settings'

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage/>} />

          {/* Protected / Layout Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path='/settings' element={<Settings/>} />
          </Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
