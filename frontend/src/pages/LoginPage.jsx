import { Container, Paper, TextField, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { login } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";


export default function LoginPage({setUser}) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("login")
        try {
            const user = await login(formData);
            setUser(user);
            navigate("/user");
        } catch (err) {
            return err
        }
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
                        display: { xs: "block", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                        padding: 2
                    }}>
                    <Typography sx={{ mr: { xs: "auto", md: 3 } }}>Username :</Typography>
                    <TextField 
                    value = {formData.username}
                    name = "username"
                    onChange= {handleOnChange}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        justifyContent: { xs: "center", md: "center" },
                        alignItems: "center",
                        padding: 2
                    }}>
                    <Typography sx={{ mr: { xs: "auto", md: 3 } }}>Password :</Typography>
                    <TextField 
                    value = {formData.password}
                    name = "password"
                    onChange= {handleOnChange}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "flex", md: "flex" },
                        justifyContent: { xs: "center", md: "end" },
                        alignItems: "center",
                    }}>
                    <Button
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick = {handleLogin}
                    >Login</Button>
                </Box>
            </Paper>
        </Container>
    )
}