import { Box, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import {useState} from "react"
import { useNavigate } from 'react-router';

export const Register=()=>{
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {id, value} = e.target;
        setFormData({...formData, [id]:value})
    }

    const handleSubmit = ()=>{
        setLoading(true);
        axios.post("https://book-club-server-hackathon.herokuapp.com/auth/register", formData).then(({data})=>{
            setLoading(false);
            navigate("/login")
        })

    }
    

    return(
        <Box>
            <h1>Register</h1>
            {loading?<CircularProgress/>:<Box sx={{display:"flex", flexDirection:"column", gap:"20px", width:"350px", margin:"auto"}} component={"form"}>
                
                <TextField onChange={handleChange} id='name' value={formData.name} placeholder='Name'/>
                <TextField onChange={handleChange} id='email' value={formData.email} type="email" placeholder='Email'/>
                <TextField onChange={handleChange} id='password' value={formData.password} type='password' placeholder='Password'/>
                {formData.name&&formData.email&&formData.password.length>5?<Button onClick={handleSubmit} variant='contained'>Register</Button>:<Button disabled onClick={handleSubmit} variant='contained'>Register</Button>}
            
            </Box>}
        </Box>
    )
}