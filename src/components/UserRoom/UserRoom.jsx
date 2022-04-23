import "./UserRoom.css";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setUser } from "../../Redux/Auth/auth.action";
import axios from "axios";

export const UserRoom = () => {
    const user = useSelector((store)=>store.auth.user);
    const [groups, setGroups] = useState([]);
    const dispatch = useDispatch()

    //Just to ensure that even if page is refreshed the user is not logged out
    useEffect(()=>{
        dispatch(setUser(JSON.parse(localStorage.getItem("bookclubUser"))))        
    },[])

    useEffect(()=>{
        if(user){
            axios.get(`https://book-club-server-hackathon.herokuapp.com/groups/user/${user.id}`).then(({data})=>{
                setGroups(data);
            })
        }
       
    },[user])

    /* {
        bookName
        description
    } */

    
    return (
        <div className="user-room">
            <div className="flex-div1">
                <div>
                    <h3>{"e.name"}</h3>
                    <p>{"e.description"}</p>
                </div>
                <div>
                <Button id="join-room1" variant="contained">Leave</Button>
                </div>
            </div>
        </div>
    )
}