import "./Books.css"
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Auth/auth.action";
import {CircularProgress, Modal, Box, TextField} from '@mui/material'

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

    //MOdal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection:"column",
        justifyContent:"center"
      };

      const navigate = useNavigate()

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
            console.log(data)
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
                memberLimit:"",
                description:""
            })
            setLoading(false)
            handleClose()
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

    function handleLeave(groupId){
        let payload = {userId:user.id}
        axios.post(`https://book-club-server-hackathon.herokuapp.com/groups/leaveGroup/${groupId}`,payload ).then(()=>{
            callRooms()
        })
    }

    function handleDelete(groupId){
        axios.delete(`https://book-club-server-hackathon.herokuapp.com/groups/${groupId}`).then(()=>{
            callRooms()
        })
    }

    function handleViewBtn(roomid){
        navigate(`/room/${roomid}`)
    }

    return (
        <div className="Main-div1">
            <div className="upper-div">
                <div>
                    <img id="book-img" src={book.cover} alt="" />
                </div>
                <div>
                    <p id="title1">{book.title}</p>
                    <p id="description">{book.description?book.description:""}</p>
                </div>
            </div>
            <br />
            <div className="lower-div">
                {loading?<CircularProgress/>:user?<Box sx={{display:"block", marginLeft:"90%"}}><Button variant="contained" onClick={handleOpen}>Add Room</Button></Box>:<Box sx={{display:"block", marginLeft:"90%"}}><Button variant="contained" disabled>Add Room</Button></Box>}
                <h2>Rooms</h2>
            <div id="rooms-div">
                
                {room.map((e) => {
                    return (
                        <div key={e.key} className="create-room-div">
                            <div>                                
                                <p>{e.description}</p>
                                <p>Created By: {e.createdBy.name}</p>
                                <p>Creaeted On: {new Date(e.createdAt).toLocaleDateString()}</p>
                                {e.members.length<e.memberLimit?<span style={{color:"green", fontSize:"20px"}}>Capacity: {e.members.length}/{e.memberLimit}</span>:<span style={{color:"red"}}>{e.members.length}/{e.memberLimit}</span>}
                            </div>
                            <div>
                            {user?isMember(e.members)?e.createdBy._id===user.id?<div>
                                <Button onClick={()=>{handleViewBtn(e._id)}} id="join-room1" variant="contained">View</Button>
                                <br/>
                                <Button onClick={()=>{handleDelete(e._id)}} sx={{backgroundColor:"red"}} id="join-room1" variant="contained" >Delete</Button>
                                </div>:<div>
                                    <Button onClick={()=>{handleViewBtn(e._id)}} id="join-room1" variant="contained">View</Button>
                                    <br/>
                                    <Button onClick={()=>{handleLeave(e._id)}}  sx={{backgroundColor:"red"}} id="join-room1" variant="contained">Leave</Button>
                                </div>:<Button onClick={()=>{handleJoin(e._id)}} id="join-room1" variant="contained">Join</Button>:<Button  id="join-room1" variant="contained">Sign In</Button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <label htmlFor="description">Discussion Topic:
        <TextField name="description" value={createRoom.description} placeholder="Description of the Room" onChange={handleChange}  type="text" />
        </label>
        <br />
        <label htmlFor="memberLimit">Maximum Member Limit
        <TextField name="memberLimit" value={createRoom.memberLimit} placeholder="Member Limit" onChange={handleChange}  type="number" min="2" max="10" />
        </label>
        <br />
        <Button variant="contained" onClick={handleSubmit} type="submit">Create Room</Button>
        </Box>
      </Modal>
        </div>
    )
}


