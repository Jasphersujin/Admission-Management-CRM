import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Layout from './layout/Layout'
import Settings from './pages/Settings'
import { useAuth } from './context/AuthContext'
import Institution from './pages/institution/Institution'
import Campus from './pages/campus/Campus'
import Department from './pages/department/Department'
import Program from './pages/program/Program'
import AcademicYear from './pages/academicyear/AcademicYear'
import AddInstitution from './pages/institution/AddInstitution'
import EditInstitution from './pages/institution/EditInstitution'
import ViewInstitution from './pages/institution/ViewInstitution'
import AddCampus from './pages/campus/AddCampus'
import EditCampus from './pages/campus/EditCampus'
import ViewCampus from './pages/campus/ViewCampus'
import AddDepartment from './pages/department/AddDepartment'
import EditDepartment from './pages/department/EditDepartment'
import ViewDepartment from './pages/department/ViewDepartment'

function App() {

  const { isAuthenticated } = useAuth();

  return (
    <>
       <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }/>

          {/* Protected Layout */}
          <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Layout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
            {/* Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Master Managememt */}
            {/* Institution */}
            <Route path='/institutions' element={<Institution/>} />
            <Route path='/institutions/new' element={<AddInstitution/>} />
            <Route path='/institutions/edit/:id' element={<EditInstitution/>} />
            <Route path='/institutions/:id' element={<ViewInstitution/>} />

            {/* <Route path='' */}

            {/* Campus */}
            <Route path='/campuses' element={<Campus/>} />
            <Route path='/campuses/new' element={<AddCampus/>} />
            <Route path='/campuses/edit/:id' element={<EditCampus/>} />
            <Route path='/campuses/:id' element={<ViewCampus/>} />

            {/* Department */}
            <Route path='/departments' element={<Department/>} />
            <Route path='/departments/new' element={<AddDepartment/>} />
            <Route path='/departments/edit/:id' element={<EditDepartment/>} />
            <Route path='/departmentss/:id' element={<ViewDepartment/>}/>

            {/* Program */}
            <Route path='/program' element={<Program/>} />

            {/* Academic Year */}
            <Route path='/academic-year' element={<AcademicYear/>} />

            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
