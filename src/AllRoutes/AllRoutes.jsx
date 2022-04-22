import {  Route, Routes } from "react-router-dom"
import {Home} from "../components/Home/Home"
import {Books} from "../components/Books/Books"
import { UserRoom } from "../components/UserRoom/UserRoom";
import { AllRoom } from "../components/AllRoom/AllRoom";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Books" element={<Books/>}/>
            <Route path="/UserRoom" element={<UserRoom/>}/>
            <Route path="/AllRoom" element={<AllRoom/>}/>
        </Routes>
    )
}