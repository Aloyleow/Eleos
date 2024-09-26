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

export default function CreateEventPage({imageEvents, countries, types, error, setError}) {
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
            setError(true)
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
                // backgroundColor: "burlywood",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    width: "100%",
                    height: "30px"
                }}>
                {error && <Typography sx={{ fontStyle: "italic", color: "red" }}>Please check your details and make sure all fields are filled!</Typography>}
            </Box>
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "#FDF2E9",
                    padding: 3
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
                        height: 500,
                        width: 750,
                        justifyContent: "space-evenly",
                        border: "1px solid"
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center"
                        }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50%"
                        }}>
                            <Typography sx={{ mr: { xs: "auto", md: 0.5 } }}>Event name:</Typography>
                            <TextField
                                name="eventname"
                                label="Event name"
                                value={formData.eventname}
                                onChange={handleOnChange}
                                sx={{ mr: { xs: "auto", md: 2 }, width: 220 }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
                            <Typography sx={{ mr: { xs: "auto", md: 0.5 }, ml: 1 }}>Type:</Typography>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    name="type"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.type}
                                    label="Type"
                                    onChange={handleOnChange}
                                    sx={{ width: 200 }}
                                >
                                    {types.map((click, index) => (
                                        <MenuItem key={index} value={click}>{click}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
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
                    </Box>
                    <Box
                        sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%" }}>
                            <Typography sx={{ mr: { xs: "auto", md: 0.5 } }}>Country:</Typography>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    name="country"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.country}
                                    label="Country"
                                    onChange={handleOnChange}
                                    sx={{ width: 200, mr: { xs: "auto", md: 1 } }}
                                >
                                    {countries.map((click, index) => (
                                        <MenuItem key={index} value={click}>{click}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", width: "50%" }}>
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
                            justifyContent: { xs: "center", md: "center" },
                            alignItems: "center",
                        }}>
                        <Button
                            variant="outlined"
                            sx={{ color: "black", borderColor: "black" }}
                            onClick={create}
                        >Create</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}