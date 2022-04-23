import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router";
import io from 'socket.io-client'
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios"
import { setUser } from "../../Redux/Auth/auth.action";
import "./Room.css"


export const Room = ()=>{
    const user = useSelector((store)=>store.auth.user);
    const {roomid} = useParams()
    const [socket,setSocket] = useState()
    const [roomDetails, setRoomDetails] = useState({})
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setUser(JSON.parse(localStorage.getItem("bookclubUser")))) 
    },[])
    useEffect(()=>{
        axios.get(`https://book-club-server-hackathon.herokuapp.com/groups/${roomid}`).then(({data})=>{
            // console.log(data)
            setRoomDetails(data)
        })
    },[])

    useEffect(()=>{
        setSocket(io.connect("https://book-club-server-hackathon.herokuapp.com"/*"http://localhost:2345"*/))       
      },[])

      useEffect(()=>{

        socket&&socket.emit("join_room", roomid)
      },[socket])

      const sendMessage = async ()=>{
        if(user&&roomid&&currentMessage!==""){
            const messageData = {
                room:roomid,
                author: user.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((prevList)=>[...prevList, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(()=>{
        if(socket){
            console.log("entering here")
          socket.on("receive_message", (data)=>{
            console.log(data)
            setMessageList((prevList)=>[...prevList, data])            
          })
        }
          
      },[socket])
    return(
        <div className="roomdiv">
            <h2>{roomDetails&&roomDetails?.bookName}</h2>
            <p><b>Topic: </b>{roomDetails?.description}</p>

            <div>
                <div className="chat-window">
                    <div className="chat-header">
                        <h2 style={{color:"white"}}>Live Chat</h2>
                    </div>
                    <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((el)=>{
                            return <div
                            className="message"
                            id={user.name === el.author ? "you" : "other"}
                          >
                            <div>
                              <div className="message-content">
                                <p>{el.message}</p>
                              </div>
                              <div className="message-meta">
                                <p id="time">{el.time}</p>
                                <p id="author">{el.author}</p>
                              </div>
                            </div>
                          </div>
                        })}
                        </ScrollToBottom>
                    </div>
                    <div className="chat-footer">
                        <input value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}} type="text" placeholder="Sup Bro!" />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}