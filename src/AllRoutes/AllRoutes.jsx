import {  Route, Routes } from "react-router-dom"
import {Home} from "../components/Home/Home"
import {Books} from "../components/Books/Books"
import { UserRoom } from "../components/UserRoom/UserRoom";
import { AllRoom } from "../components/AllRoom/AllRoom";
import { Register } from "../components/Register/Register";
import { Login } from "../components/Login/Login";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/:bookid" element={<Books/>}/>
            <Route path="/UserRoom" element={<UserRoom/>}/>
            <Route path="/AllRoom" element={<AllRoom/>}/>
        </Routes>
    )
}