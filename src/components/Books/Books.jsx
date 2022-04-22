import "./Books.css"
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";

export const Books = () => {

    const [createRoom,setCreateRoom] = useState({
        name:"",
        description:""
    });
    const [room,setRoom] = useState([]);

    function handleChange(e){
        const {name,value} = e.target;
        setCreateRoom({
            ...createRoom,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setRoom([...room,createRoom])
        console.log(room)
    }


    return (
        <div className="Main-div1">
            <div className="upper-div">
                <div>
                    <img id="book-img" src="" alt="" />
                </div>
                <div>
                    <p id="title1">Title</p>
                    <p id="description">dsadadfdsfdsfdsfdsfsdfsdfdsfsdfdsfdsfds</p>
                </div>
            </div>
            <br />
            <div className="lower-div">
                <form onSubmit={handleSubmit}>
                    <input name="name" value={createRoom.name} placeholder="Name of the Room" onChange={handleChange} id="input-name" type="text" />
                    <input name="description" value={createRoom.description} placeholder="Description of the Room" onChange={handleChange} id="input-description" type="text" />
                    <input value="Create Room" id="create-room1" type="submit" />
                </form>
            <div id="rooms-div">
                {room.map((e) => {
                    return (
                        <div className="create-room-div">
                            <div>
                                <h3>{e.name}</h3>
                                <p>{e.description}</p>
                            </div>
                            <div>
                            <Button id="join-room1" variant="contained">Join</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}
