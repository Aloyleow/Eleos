import { Container, Paper, TextField, Typography, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { signUpUser } from "../services/verifyServices";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);

export default function SignUpPage() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [countries] = useState([
        "Singapore"
    ])
    const [date, setDate] = useState()
    const [formData, setFormData] = useState({
        fullname: "",
        nric: "",
        dob: "",
        email: "",
        contactnumber: "",
        country: "",
        username: "",
        password: ""
    })
   
    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        
    }

    const handleDisable = () => {
        for (const obj in formData){
            if (formData[obj] === '') {
                return true      
            }
            if (formData[obj] === undefined) {
                return true      
            } 
        } 
        return false
    }
    

    const handlesignUpUser = async (event) => {
        event.preventDefault();
        console.log("login")
        try {
            await signUpUser(formData);
            navigate("/login");
        } catch (err) {
            setError(true)
            return err     
        }
    }
    const handleDate = (event) => {
        setDate(event.format('DD-MM-YYYY'))
        setFormData({...formData, dob: date})
    }

    return (
        <Container
            sx={{
                // backgroundColor: "lightgreen",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}
        >    
           <Typography variant="h4">Welcome to Lets * Help! Sign up Now!</Typography> 
            <Box
              sx={{ justifyContent: "center", display: "flex", width: "300px", height: "30px"}}
            >
            {error && <Typography sx={{fontStyle: "italic", color: "red"}}>Please check your details!</Typography>}
            </Box>
            <Paper
                sx={{
                    padding: 3,
                    backgroundColor: "#FDF2E9",
                }}
            >
                <Box
                sx={{
                    display: { xs: "block", md: "block" },
                    justifyContent: { xs: "center", md: "center" },
                    alignItems: "center",
                    m: 1,
                    border: "0.5px solid"
                }}>
                    
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                        padding: 2,
                        m: 1,
                    }}>
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Fullname :</Typography>
                    <TextField
                    name = "fullname"
                    label = "Fullname"
                    
                    value = {formData.fullname}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }} 
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>NRIC :</Typography>
                    <TextField 
                    name = "nric"
                    // label = "ID no."
                    value = {formData.nric}
                    placeholder= "eg. SxxxF or TxxxS"
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Date Of Birth :</Typography>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker 
                            name="dob"
                            label = "DOB"
                            defaultValue={dayjs().tz('Asia/Singapore')}
                            onChange={handleDate}
                            format="DD-MM-YYYY"
                            sx={{width: "150px"}}
                            />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                        padding: 2,
                        m: 1,
                    }}>
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Email :</Typography>
                    <TextField
                    name = "email"
                    label = "Email"
                    value = {formData.email} 
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Contact number :</Typography>
                    <TextField
                    name = "contactnumber"
                    label = "Hp. no"
                    value = {formData.contactnumber} 
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Country :</Typography>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            name="country"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.country}
                            label="Country"
                            onChange={handleOnChange}
                            sx={{width: 200, mr: { xs: "auto", md: 1 }}}
                        >
                            {countries.map((click, index) => (
                                <MenuItem key = {index} value={click}>{click}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                        
                        padding: 2,
                        m: 1
                    }}>
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Username :</Typography>
                    <TextField
                    name = "username"
                    label = "Username"
                    value = {formData.username}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 }, width: "300px" }}   
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Password :</Typography>
                    <TextField
                    sx={{ mr: { xs: "auto", md: 1 }, width: "300px" }}
                    name = "password"
                    label = "Password"
                    value = {formData.password}
                    onChange = {handleOnChange}  
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "flex", md: "flex" },
                        justifyContent: { xs: "center", md: "space-between" },
                        alignItems: "center",
                    }}>
                    <NavLink to="/signup/host">Organisation Signup</NavLink>    
                    <Button
                        variant="outlined"
                        sx={{ mr: 18.5, color: "black", borderColor: "black" }}
                        disabled={handleDisable()}
                        onClick = {handlesignUpUser}
                    >Sign UP</Button>
                    <Typography></Typography>
                </Box>
            </Paper>
            <Typography variant="h7">If you are applying for an organisation click the link above</Typography> 
        </Container>
    )
}