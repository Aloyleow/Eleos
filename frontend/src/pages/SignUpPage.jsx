import { Container, Paper, TextField, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { signUpUser } from "../services/verifyServices";
import { NavLink, useNavigate } from "react-router-dom";



export default function SignUpPage() {
    const navigate = useNavigate()
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

    const handlesignUpUser = async (event) => {
        event.preventDefault();
        console.log("login")
        try {
            await signUpUser(formData);
            navigate("/login");
        } catch (err) {
            return err
        }
    }
    const handleClickHost = (event) => {
        navigate("/signup/host")
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
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Fullname :</Typography>
                    <TextField
                    name = "fullname"
                    value = {formData.fullname}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }} 
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>NRIC :</Typography>
                    <TextField 
                    name = "nric"
                    value = {formData.nric}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Date Of Birth :</Typography>
                    <TextField
                    name = "dob"
                    value = {formData.dob} 
                    onChange = {handleOnChange} 
                    />
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
                        justifyContent: { xs: "center", md: "space-between" },
                        alignItems: "center",
                    }}>
                    <NavLink to="/signup/host">Organisation Signup</NavLink>    
                    <Button
                        variant="outlined"
                        sx={{ mr: 18.5, color: "black", borderColor: "black" }}
                        onClick = {handlesignUpUser}
                    >Sign UP</Button>
                    <Typography></Typography>
                </Box>
            </Paper>
        </Container>
    )
}