import { Container, Paper, TextField, Typography, Box, Button, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { loginUser } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";


export default function LoginPage({setUser}) {
    const navigate = useNavigate()
    const [host, setHost] = useState(false)
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
            const user = await loginUser(formData);
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
                    justifyContent: { xs: "center", md: "space-around"},
                    alignItems: "center",
                }}
                >
                     <FormControl>
      <FormLabel id="demo-form-control-label-placement">Label placement</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel
          value="top"
          control={<Radio />}
          label="Top"
          labelPlacement="top"
        />
        <FormControlLabel
          value="start"
          control={<Radio />}
          label="Start"
          labelPlacement="start"
        />
        <FormControlLabel
          value="bottom"
          control={<Radio />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<Radio />} label="End" />
      </RadioGroup>
    </FormControl>>     
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

