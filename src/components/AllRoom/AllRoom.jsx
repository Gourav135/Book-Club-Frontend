import "./AllRoom.css";
import Button from '@mui/material/Button';

export const AllRoom = () => {

    
    return (
        <div className="user-room">
            <div className="flex-div1">
                <div>
                    <h3>{"e.name"}</h3>
                    <p>{"e.description"}</p>
                </div>
                <div>
                <Button id="join-room1" variant="contained">Join</Button>
                </div>
            </div>
        </div>
    )
}