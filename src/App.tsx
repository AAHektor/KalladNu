import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import './App.css'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Group from './features/group/Group'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/group" element={<Group/>} />

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
