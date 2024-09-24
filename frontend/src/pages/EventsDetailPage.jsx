import { useState, useEffect } from "react"
import { getOneEvent, joinEvent, user_attendingsCount } from "../services/verifyServices"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography, Button } from "@mui/material"

export default function EventsDetailPage(){
    const navigate = useNavigate()
    const { eventsid } = useParams()
    const [data, setData] = useState([])
    const [attendees, setAttendees] = useState([])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const oneEvent = await getOneEvent(eventsid);
                setData(oneEvent.event[0]);
                               
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

                
    const join = async (event) => {
        event.preventDefault();
        try {
            await joinEvent(eventsid);
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
                image={data.image}
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
                <Button variant="outlined" onClick={join}>Join</Button>
            </Box>


        </Box>
        </Box>
    
    </Container>
    
)}