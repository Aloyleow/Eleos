import { Container, Paper, TextField, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, } from "@mui/material";
import { useState } from "react";
import { loginHost, loginUser } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";


export default function LoginPage({setUser, setType}) {
    const navigate = useNavigate()
    const [host, setHost] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleOnChangeRadio = (event) => {
        if (event.target.value === "organisation") {
            setHost(true)          
        } else {
            setHost(false)
        }
    }
    

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            if (host === true) {
                const host = await loginHost(formData);
                setUser(host);
                setType("host")
                navigate("/host");
            } else {
                const user = await loginUser(formData);
                setUser(user);
                setType("user")
                navigate("/user");
            }
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
                    justifyContent: { xs: "center", md: "space-around"},
                    alignItems: "center",
                }}
                >
                     <FormControl>
      
      <RadioGroup row onChange={handleOnChangeRadio}>
        <FormControlLabel
          value="user"
          control={<Radio />}
          label="User"
          labelPlacement="start"
        />
        <FormControlLabel
          value="organisation"
          control={<Radio />}
          label="Organisation"
          labelPlacement="start"
        />

      </RadioGroup>
    </FormControl>     
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

