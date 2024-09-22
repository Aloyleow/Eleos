import { useState, useEffect } from "react"
import { getOneEvent, joinEvent } from "../services/verifyServices"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography, Button } from "@mui/material"
import download from "../images/download.jpg"

export default function EventsDetailPage(){
    const navigate = useNavigate()
    const { eventid } = useParams()
    const [data, setData] = useState({})

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await getOneEvent(eventid);
                setData(data.event[0]);
                
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[eventid])
    console.log(data)

    const join = async (event) => {
        event.preventDefault();
        try {
            await joinEvent(eventid);
            navigate("/user");
        } catch (err) {
            return err
        }
    }


    return (
    
    <Container
    sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}
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
                <Typography>Current attendees: {data.attendees}</Typography>
                <Button variant="outlined" onClick={join}>Join</Button>
            </Box>


        </Box>
        </Box>
    
    </Container>
    
)}