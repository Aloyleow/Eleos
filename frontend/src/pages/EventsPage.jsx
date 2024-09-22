import { useState, useEffect } from "react"
import { getEvents, user_attendingsCount } from "../services/verifyServices"
import { Container, Box, Typography, Card, CardContent, CardActionArea, CardMedia } from "@mui/material"
import download from "../images/download.jpg"
import { useNavigate } from "react-router-dom"

//try to play with usercounts on this page when free

export default function EventsPage() {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await getEvents();
                setEvents(data.event);
                
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[])

    
    const handleOnClick = (id) => {
        navigate(`/event/${id}`)
    }
    

    return (
        <Container
            sx={{
                height: "80vh",
                // backgroundColor: "burlywood",
                justifyContent: "center",
                alignItems: "center",
                mt: 5
            }}
        >
            {events.map((event, index)=>(
            <Card key={index} sx={{ width: "80%", minWidth: "auto", backgroundColor: "#FDF2E9", mt: 2, ml: 13 }}>
                <CardActionArea sx={{display: "flex",}} onClick={() => {handleOnClick(event.eventsid)}}>                   
                    <CardMedia
                        component="img"
                        height="140"
                        image={download}
                        alt="green iguana"
                        sx={{ maxWidth :300, minWidth: 300, flexShrink: 0}}
                    />
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {event.eventname}, {event.type}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {event.location}, {event.country}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {event.attendees} People needed
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Container>
        
    )
}