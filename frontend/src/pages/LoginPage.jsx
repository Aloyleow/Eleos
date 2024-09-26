import { Container, Paper, TextField, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, Modal } from "@mui/material";
import { useState } from "react";
import { loginHost, loginUser, forgotPassword } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";



export default function LoginPage({setUser, setHumanType}) {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [host, setHost] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userNric, setUserNric] = useState({
        username: "",
        nric: ""
    })

   
    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleOnChangeUserNric = (event) => {
        setUserNric({...userNric, [event.target.name]: event.target.value})
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
                setHumanType("host")
                navigate("/host");
            } else {
                const user = await loginUser(formData);
                setUser(user);
                setHumanType("user")
                navigate("/user");
            }
        } catch (err) {
            setError(true)
            return err
        }
    }

    const handleForgetPassword = async (event) => {
        event.preventDefault();
        try {
            await forgotPassword(userNric)
            handleClose()
        } catch (err) {
            setError(true)
            return err
        }
    }


    return (
       <>
        <Container
            sx={{
                // backgroundColor: "lightgreen",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
             <Box
              sx={{ justifyContent: "center", display: "flex", width: "300px", height: "30px"}}
            >
            {error && <Typography sx={{fontStyle: "italic", color: "red", mb: 5}}>Invalid Authorization!</Typography>}
            </Box>
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
            <Button sx={{ mt: 2 }} onClick={handleOpen}>Forget password</Button>
        </Container>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={{
                    position: "absolute", 
                    top: "30%", left: "38%", 
                    backgroundColor: "#FDF2E9", 
                    display: "flex", 
                    flexDirection: "column",
                    height: 400,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <Typography sx={{wordBreak: "break-word", width: "70%", alignSelf: "center", justifyContent: "center"}}>Key in your username and ic a new password will be sent to your email</Typography>
                    <Typography sx={{ mr: { xs: "auto", md: 3 } }}>Username :</Typography>
                    <TextField 
                    value = {userNric.username}
                    name = "username"
                    onChange= {handleOnChangeUserNric}
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 3 } }}>NRIC :</Typography>
                    <TextField 
                    value = {userNric.nric}
                    name = "nric"
                    onChange= {handleOnChangeUserNric}
                    />
                    <Button onClick={handleForgetPassword}>Get new password</Button>
                </Box>             
            </Modal>
        </div>
        </>   
    )
}

