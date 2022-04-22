import {  Route, Routes } from "react-router-dom"
import {Home} from "../components/Home/Home"
import { Login } from "../components/Login"
import { Signup } from "../components/Signup"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    )
}