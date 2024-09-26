import { deleteEvent, editEvent, getOneEvent, user_attendingsCount } from "../services/verifyServices"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography, Button, Paper, TextField, Card, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

dayjs.extend(utc);
dayjs.extend(timezone)


export default function EditEventPage({imageEvents}) {
    const navigate = useNavigate()
    const { eventsid } = useParams()
    const [date, setDate] = useState()
    const [data, setData] = useState({})
    const [attendees, setAttendees] = useState([])
    const [formData, setFormData] = useState({ 
        datentime: "",
        location: "", 
        comments: "",
        attendees: "",
        image: ""
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
        setDate(event.format('ddd DD-MMM-YYYY hh:mm a'))
        setFormData({...formData, datentime: date})
    }

    return (

        <Container
            sx={{ 
                height: "90vh", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                flexDirection: "column", 
                mt: 5 
            }}>
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "#FDF2E9",
                    padding: 1,
                    height: "50%",
                    width: "100%"
                }}
                elevation={10}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center"
                        
                    }}
                >
                    <Card sx={{ width: 300, height: 140 }}>
                        <CardMedia
                            component="img"
                            alt="blueSpider"
                            height="140"
                            image={formData.image || imageEvents[0]}
                        />
                    </Card>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Image</InputLabel>
                        <Select
                            name="image"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.image}
                            label="Image"
                            onChange={handleOnChange}
                            sx={{ width: 200 }}
                        >
                            {imageEvents.map((click, index) => (
                                <MenuItem key={index} value={click}>{index}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: 800,
                        justifyContent: "space-evenly",
                        border: "1px solid"
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center"
                        }}>
                    </Box>
                    
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography sx={{ mr: { xs: "auto", md: 0.5 } }}>Location:</Typography>
                        <TextField
                            name="location"
                            placeholder="Street name..Postal code"
                            value={formData.location}
                            onChange={handleOnChange}
                            sx={{ width: 300 }}
                        />
                    </Box>              
                    <Box
                        sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}
                    >
                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography sx={{ mr: { xs: "auto", md: 0.5 } }}>Date & time:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    name="datentime"
                                    defaultValue={dayjs().tz('Asia/Singapore', true)}
                                    onChange={handleDate}
                                    format="DD-MM-YYYY hh:mm a"
                                    sx={{ width: 220, mr: 0 }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%" }}>
                            <Typography sx={{ mr: { xs: "auto", md: 0.5 } }}>Attendees :</Typography>
                            <TextField
                                name="attendees"
                                value={formData.attendees}
                                onChange={handleOnChange}
                                sx={{ width: 60 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            height: "40%"
                        }}>
                        <Typography sx={{ mr: { xs: "auto", md: 1 } }}>Comments :</Typography>
                        <TextField
                            name="comments"
                            value={formData.comments}
                            placeholder="Description of event, attendees roles etc."
                            onChange={handleOnChange}
                            multiline
                            minRows={5}
                            sx={{ mr: { xs: "auto", md: 1 }, width: "80%" }}
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
                            sx={{ color: "black", borderColor: "black" }}
                            onClick={edit}
                        >Edit</Button>
                        <Button
                            variant="outlined"
                            sx={{ color: "black", borderColor: "black" }}
                            onClick={clickDeleteEvent}
                        >Delete</Button>
                    </Box>
                </Box>
            </Paper>
            <Box sx={{ display: "flex", justifyContent: "center", height: "50%", width: "100%" }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}
                >
                    <Box>
                        <CardMedia
                            component="img"
                            height="140"
                            image={data.image}
                            alt="green iguana"
                            sx={{ maxWidth: 300, minWidth: 300, flexShrink: 0 }}
                        />
                    </Box>
                    <Box sx={{height: "60%"}}>
                    <Typography sx={{  }} color="#FF6F61">More info:</Typography>
                    <Typography sx={{wordBreak: "break-word", width: 600, fontSize: "18px"}} color="#333333">{data.comments}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}
                >
                    <Typography sx={{ alignSelf: "center" }} color="#FF6F61">Event name: </Typography>
                    <Typography sx={{fontSize: "18px", alignSelf: "center"}} color="#333333">{data.eventname}</Typography>
                    <Typography sx={{ alignSelf: "center" }} color="#FF6F61">Event type: </Typography>
                    <Typography sx={{fontSize: "18px", alignSelf: "center"}} color="#333333">{data.type}</Typography>
                    <Typography sx={{ alignSelf: "center" }} color="#FF6F61">Date and time: </Typography>
                    <Typography sx={{fontSize: "18px", alignSelf: "center"}} color="#333333">{data.datentime}</Typography>
                    <Typography sx={{ alignSelf: "center" }} color="#FF6F61">Location: </Typography>
                    <Typography sx={{ wordBreak: "break-word", fontSize: "18px", alignSelf: "center" }} color="#333333">{data.location}</Typography>
                    
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: 500, height: 80 }}>
                        <Typography>Current attendees: {attendees.count}/{data.attendees}</Typography>
                    </Box>


                </Box>
            </Box>

        </Container>

    
)}