import { Routes, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from "./views/Login"

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    )
}
