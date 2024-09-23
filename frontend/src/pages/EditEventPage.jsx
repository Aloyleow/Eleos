import { deleteEvent, editEvent, getOneEvent, user_attendingsCount } from "../services/verifyServices"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography, Button, Paper, TextField } from "@mui/material"
import download from "../images/download.jpg"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

dayjs.extend(utc);
dayjs.extend(timezone)


export default function EditEventPage() {
    const navigate = useNavigate()
    const { eventsid } = useParams()
    const [date, setDate] = useState()
    const [data, setData] = useState({})
    const [attendees, setAttendees] = useState([])
    const [formData, setFormData] = useState({
        eventname: "",
        type: "",
        datentime: "",
        location: "",
        country: "",
        comments: "",
        attendees: ""
    })

    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const edit = async () => {
        try {
            await editEvent(eventsid, formData);
        } catch (err) {
            return err
        }
    }
    const clickDeleteEvent = async () =>{
        try {
            await deleteEvent(eventsid);
            navigate("/host")
        } catch (err) {
            return err
        }
    }

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await getOneEvent(eventsid);
                setData(data.event[0]);
                setFormData(data.event[0])
                
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[eventsid])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const attendees = await user_attendingsCount(eventsid)
                setAttendees(attendees.rows[0])
                               
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[eventsid])

        
    const handleDate = (event) => {
        setDate(event.toString())
        setFormData({...formData, datentime: date})
    }

    return (
    
    <Container
    sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
    >
        <Box sx={{display: "flex"}}>
        <Box
        sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}
        >
            <Box>
            <CardMedia
                component="img"
                height="140"
                image={download}
                alt="green iguana"
                sx={{ maxWidth: 300, minWidth: 300, flexShrink: 0 }}
            />
            </Box>
            <Box>
            <Typography>More info: {data.comments}</Typography>
            </Box>
        </Box>
        <Box
        sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}
        >
            <Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: 500, height: 80}}>
                <Typography>Event name: {data.eventname}</Typography>
                <Typography>Event type: {data.type}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: 500, height: 80}}>
                <Typography>Date and time: {data.datentime}</Typography>
                <Typography>Location: {data.location}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: 500, height: 80}}>
                <Typography>Current attendees: {attendees.count}/{data.attendees}</Typography>
            </Box>


        </Box>
        </Box>
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
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            name="datentime"
                            defaultValue={dayjs().tz('Asia/Singapore')}
                            onChange={handleDate}
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
                        justifyContent: { xs: "center", md: "space-around" },
                        alignItems: "center",
                    }}> 
                    <Button
                        variant="outlined"
                        sx={{color: "black", borderColor: "black" }}
                        onClick={edit}
                    >Edit</Button>
                    <Button
                        variant="outlined"
                        sx={{color: "black", borderColor: "black" }}
                        onClick={clickDeleteEvent}
                    >Delete</Button>
                    </Box>
                </Box>
            </Paper>
    
    </Container>
    
)}