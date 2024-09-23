import { Container, Paper, TextField, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { signUpHost } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);


export default function SignUpPageHost() {
    const navigate = useNavigate()
    const [date, setDate] = useState()
    const [formData, setFormData] = useState({
        orgname: "",
        uen: "",
        regdate: "",
        email: "",
        contactnumber: "",
        country: "",
        username: "",
        password: ""
    })

    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handlesignUpUser = async (event) => {
        event.preventDefault();
        console.log("login")
        try {
            await signUpHost(formData);
            navigate("/login");
        } catch (err) {
            return err
        }
    }
    const handleDate = (event) => {
        setDate(event.toString())
        setFormData({...formData, regdate: date})
    }


    return (
        <Container
            sx={{
                // backgroundColor: "lightgreen",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
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
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Organisation :</Typography>
                    <TextField
                    name = "orgname"
                    value = {formData.orgname}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }} 
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>UEN :</Typography>
                    <TextField 
                    name = "uen"
                    value = {formData.uen}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Registered date :</Typography>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker 
                            name="regdate"
                            defaultValue={dayjs().tz('Asia/Singapore')}
                            onChange={handleDate}
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
                    value = {formData.email} 
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Contact number :</Typography>
                    <TextField
                    name = "contactnumber"
                    value = {formData.contactnumber} 
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Country :</Typography>
                    <TextField
                    name = "country"
                    value = {formData.country}
                    onChange = {handleOnChange}  
                    />
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
                    value = {formData.username}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}   
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Password :</Typography>
                    <TextField
                    
                    name = "password"
                    value = {formData.password}
                    onChange = {handleOnChange}  
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "flex", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                    }}>
                    <Button
                        variant="outlined"
                        sx={{ mr: 2, color: "black", borderColor: "black" }}
                        onClick = {handlesignUpUser}
                    >Sign UP</Button>
                </Box>
            </Paper>
        </Container>
    )
}