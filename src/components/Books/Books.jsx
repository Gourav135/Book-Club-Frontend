import "./Books.css"
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Auth/auth.action";
import {CircularProgress} from '@mui/material'

export const Books = () => {
    const user = useSelector((store)=>store.auth.user)
    const dispatch = useDispatch()
    const [createRoom,setCreateRoom] = useState({
        memberLimit:10,
        description:""
    });
    const [loading, setLoading] = useState(false)
    const [room,setRoom] = useState([]);

    //retrieving book data
    const [book, setBook] = useState({});
    const {bookid} = useParams()
    useEffect(()=>{
        dispatch(setUser(JSON.parse(localStorage.getItem("bookclubUser"))));
    },[])
    useEffect(()=>{
        axios.get(`https://openlibrary.org/works/${bookid}.json`).then(({data})=>{
            console.log(data)
            setBook({
                title:data.title,
                description: data.description,
                key: data.key,
                cover:`https://covers.openlibrary.org/b/id/${data.covers[data.covers.length-1]}-L.jpg`
            })
        })

    },[])

    useEffect(()=>{
        callRooms();
    },[book])

    function callRooms(){
        axios.get(`https://book-club-server-hackathon.herokuapp.com/groups/book/${book.title}`).then(({data})=>{
            // console.log(data)
            setRoom(data);
        })
    }

    function handleChange(e){
        const {name,value} = e.target;
        setCreateRoom({
            ...createRoom,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        let payload = {
            bookName : book.title,
            description:createRoom.description,
            memberLimit:createRoom.memberLimit,
            members:[user.id],
            createdBy: user.id
        }
        axios.post(`https://book-club-server-hackathon.herokuapp.com/groups`, payload).then(()=>{
            callRooms();
            setCreateRoom({
                memberLimit:10,
                description:""
            })
            setLoading(false)
        }).catch(()=>{
            setLoading(false);
        })
    }

    //Checking whether user is part of the meeting or not
    function isMember(members){
        let joined = members.filter((el)=>{
            if(el._id===user.id){
                return el;
            }
        })
        if(joined.length>0){
            return true;
        }
        else{
            return false;
        }

    }

    function handleJoin(groupId){
        let payload = {userId:user.id}
        axios.post(`https://book-club-server-hackathon.herokuapp.com/groups/joinGroup/${groupId}`,payload ).then(()=>{
            callRooms()
        })
    }

    return (
        <div className="Main-div1">
            <div className="upper-div">
                <div>
                    <img id="book-img" src={book.cover} alt="" />
                </div>
                <div>
                    <p id="title1">{book.title}</p>
                    <p id="description">{book.description}</p>
                </div>
            </div>
            <br />
            <div className="lower-div">
                {loading?<CircularProgress/>:<form onSubmit={handleSubmit}>
                    <input name="description" value={createRoom.description} placeholder="Description of the Room" onChange={handleChange} id="input-description" type="text" />
                    <input name="memberLimit" value={createRoom.memberLimit} placeholder="Member Limit" onChange={handleChange} id="input-name" type="number" min="2" max="10" />
                    <input value="Create Room" id="create-room1" type="submit" />
                </form>}
            <div id="rooms-div">
                {room.map((e) => {
                    return (
                        <div className="create-room-div">
                            <div>                                
                                <p>{e.description}</p>
                                <p>Created By: {e.createdBy.name}</p>
                            </div>
                            <div>
                            {isMember(e.members)?<Button id="join-room1" variant="contained">View</Button>:<Button onClick={()=>{handleJoin(e._id)}} id="join-room1" variant="contained">Join</Button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}
