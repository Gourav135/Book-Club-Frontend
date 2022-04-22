import {  Route, Routes } from "react-router-dom"
import {Home} from "../components/Home/Home"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}