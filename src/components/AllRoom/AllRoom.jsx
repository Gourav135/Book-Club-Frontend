import "./AllRoom.css";
import Button from '@mui/material/Button';
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { setUser } from "../../Redux/Auth/auth.action";
import axios from "axios";

export const AllRoom = () => {
    const user = useSelector((store)=>store.auth.user);
    console.log("All rooms");
    const [groups, setGroups] = useState([]);
    const dispatch = useDispatch()

    //Just to ensure that even if page is refreshed the user is not logged out
    useEffect(()=>{
        dispatch(setUser(JSON.parse(localStorage.getItem("bookclubUser"))))        
    },[])

    useEffect(()=>{
        if(user){
            axios.get(`https://book-club-server-hackathon.herokuapp.com/groups`).then(({data})=>{
                setGroups(data);

                console.log("hai", data);
            })
        }
       
    },[user])

    
    return (
        <div className="user-room">
            <div className="flex-div1">
                <div>
                    <h3>{"e.name"}</h3>
                    <p>{"e.description"}</p>
                </div>
                <div>
                {user?<Button id="join-room1" variant="contained">Join</Button>:<Button disabled id="join-room1" variant="contained">Join</Button>}
                </div>
            </div>
        </div>
    )
}