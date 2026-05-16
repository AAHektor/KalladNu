import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import './App.css'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Group from './features/group/Group'
import Dashboard from './features/dashboard/Dashboard'
import Invitations from './features/invitations/Invitations'
import SendInvite from './features/sendInvite/sendInvite'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/group" element={<Group/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/invitations" element={<Invitations/>} />
                <Route path="/sendInvite" element={<SendInvite/>} />

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
