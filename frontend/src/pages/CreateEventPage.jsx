import { Box, Paper, Container, Typography, TextField, Button, Card, CardMedia, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
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

export default function CreateEventPage({imageEvents}) {
    const [date, setDate] = useState()
    const [formData, setFormData] = useState({
        eventname: "",
        type: "",
        datentime: "",
        location: "",
        country: "",
        comments: "",
        attendees: "",
        image: ""
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
    
    const handleDate = (event) => {
        setDate(event.format('ddd DD-MMM-YYYY hh:mm a'))
        setFormData({...formData, datentime: date})

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
                    sx={{display: "flex", flexDirection: "column",justifyContent: "space-around", alignItems: "center"}}
                >
                    <Card sx={{ width: 300, height: 140}}>
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
                            sx={{width: 200}}
                        >
                            {imageEvents.map((click, index) => (
                                <MenuItem key = {index} value={click}>{index}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            defaultValue={dayjs().tz('Asia/Singapore', true)}
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