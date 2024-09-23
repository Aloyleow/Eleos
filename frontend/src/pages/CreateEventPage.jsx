import { Box, Paper, Container, Typography, TextField, Button } from "@mui/material"
import { createEvent } from "../services/verifyServices"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

dayjs.extend(utc);
dayjs.extend(timezone)

export default function CreateEventPage() {
    const [test, setTest] = useState()
    const [formData, setFormData] = useState({
        eventname: "",
        type: "",
        datentime: "",
        location: "",
        country: "",
        comments: "",
        attendees: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const create = async (event) => {
        event.preventDefault();
        try {
            await createEvent(formData);
            navigate("/host");
        } catch (err) {
            return err
        }
    }
    
    const handleTest = (event) => {
        setTest(event.toString())
        setFormData({...formData, datentime: test})
    }
    

    return (
        <Container
            sx={{
                height: "80vh",
                backgroundColor: "burlywood",
                justifyContent: "center",
                alignContent: "center"
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "#FDF2E9",
                    padding: 3
                }}
            >
                <Box
                    sx={{ backgroundColor: "grey" }}
                >
                    <Typography>box 1</Typography>
                </Box>
                <Box
                    sx={{ display: "block", border: "1px solid" }}
                >
                    <Box
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Event name :</Typography>
                        <TextField
                            name="eventname"
                            value={formData.eventname}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        />
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Type :</Typography>
                        <TextField
                            name="type"
                            value={formData.type}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        />
                    </Box>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Date and Time :</Typography>
                        {/* <TextField
                            
                            value={formData.datentime}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        /> */}
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            name="datentime"
                            defaultValue={dayjs().tz('Asia/Singapore')}
                            onChange={handleTest}
                            />
                        </LocalizationProvider>
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Location :</Typography>
                        <TextField
                            name="location"
                            value={formData.location}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        />
                    </Box>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Country :</Typography>
                        <TextField
                            name="country"
                            value={formData.country}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        />
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Attendees :</Typography>
                        <TextField
                            name="attendees"
                            value={formData.attendees}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
                        />
                    </Box>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Comments :</Typography>
                        <TextField
                            name="comments"
                            value={formData.comments}
                            onChange={handleOnChange}
                            sx={{ mr: { xs: "auto", md: 1 } }}
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
                        sx={{color: "black", borderColor: "black" }}
                        onClick={create}
                    >Create</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}