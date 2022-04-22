import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import {useState} from "react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../Redux/Auth/auth.action';

export const Login=()=>{
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        const {id, value} = e.target;
        setFormData({...formData, [id]:value})
    }

    const handleSubmit = ()=>{
        setLoading(true);
        axios.post("https://book-club-server-hackathon.herokuapp.com/auth/login", formData).then(({data})=>{
            dispatch(setUser(data));
            setError(false);
            setLoading(false);
            localStorage.setItem("bookclubUser", JSON.stringify(data));
            navigate("/")
        }).catch((er)=>{
            setLoading(false)
            setError(true);
        })

    }
    

    return(
        <Box>
            <h1>Login</h1>
            {loading?<CircularProgress/>:<Box sx={{display:"flex", flexDirection:"column", gap:"20px", width:"350px", margin:"auto"}} component={"form"}>
                <TextField onChange={handleChange} id='email' value={formData.email} type="email" placeholder='Email'/>
                <TextField onChange={handleChange} id='password' value={formData.password} type='password' placeholder='Password'/>
                {formData.email&&formData.password?<Button onClick={handleSubmit} variant='contained'>Login</Button>:<Button disabled onClick={handleSubmit} variant='contained'>Login</Button>}
                {error&&<Alert severity="error">Invalid! Try Again</Alert>}            
            </Box>}
        </Box>
    )
}