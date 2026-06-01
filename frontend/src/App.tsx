import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import './App.css'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Group from './features/group/Group'
import Dashboard from './features/dashboard/Dashboard'
import Invitations from './features/invitations/Invitations'
import SendInvite from './features/sendInvite/SendInvite'
import SentInvitations from './features/sentInvitations/SentInvitations'
import { isAuthenticated } from './services/auth'

const HomeRedirect = () => {
  return <Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />
}

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/group" element={<Group/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/invitations" element={<Invitations/>} />
                <Route path="/sendInvite" element={<SendInvite/>} />
                <Route path="/sentInvitations" element={<SentInvitations/>} />
                <Route path="*" element={<HomeRedirect />} />

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
