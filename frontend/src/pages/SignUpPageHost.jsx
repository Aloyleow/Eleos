import { Container, Paper, TextField, Typography, Box, Button, Card, CardContent, CardMedia, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { signUpHost } from "../services/verifyServices";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);

export default function SignUpPageHost({imageHost, countries}) {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [date, setDate] = useState()
    const [formData, setFormData] = useState({
        orgname: "",
        uen: "",
        regdate: "",
        email: "",
        contactnumber: "",
        country: "",
        image: "",
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
            setError(true)
            return err
        }
    }
    const handleDate = (event) => {
        setDate(event.format('DD-MM-YYYY'))
        setFormData({...formData, regdate: date})
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


    return (
        <Container
            sx={{
                // backgroundColor: "lightgreen",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 4
            }}
        >
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
                    <Typography sx={{ mr: { xs: "auto", md: 1 }}}>Organisation :</Typography>
                    <TextField
                    placeholder="Org. name"
                    name = "orgname"
                    value = {formData.orgname}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 3 } }} 
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>UEN :</Typography>
                    <TextField 
                    placeholder="UEN/SSN/VCRN/BRN"
                    name = "uen"
                    value = {formData.uen}
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 3 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Registered date :</Typography>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker 
                            name="regdate"
                            defaultValue={dayjs().tz('Asia/Singapore', true)}
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
                    placeholder="Org. Email"
                    name = "email"
                    value = {formData.email} 
                    onChange = {handleOnChange}
                    sx={{ mr: { xs: "auto", md: 1 } }}  
                    />
                    <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Contact number :</Typography>
                    <TextField
                    placeholder="Org. Contact Number"
                    name = "contactnumber"
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
                <Box sx={{display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Image</InputLabel>
                        <Select
                            name="image"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.image}
                            label="Image"
                            onChange={handleOnChange}
                            sx={{width: 200}}
                        >
                            {imageHost.map((click, index) => (
                                <MenuItem key = {index} value={click}>{index}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Card sx={{ width: 300, height: 250 }}>
                        <CardMedia
                            component="img"
                            alt="blueSpider"
                            height="140"
                            image={formData.image || imageHost[0]}
                        />
                        <CardContent>
                            <Typography component="div">
                                Organisation: {formData.orgname}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                UEN: {formData.uen}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Reg. date: {formData.regdate}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Typography>  Profile view under organisations</Typography>
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
                        disabled = {handleDisable()}
                    >Sign UP</Button>
                </Box>
            </Paper>
        </Container>
    )
}