import {Card, CardActionArea, CardContent ,Box, Container, CardMedia, Typography } from "@mui/material"
import { hostEvents, eventHostUserTrack } from "../services/verifyServices"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sortEventsAsc } from "../utilities/functions"

export default function HostPage() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [attendees, setAttendees] = useState({})
    

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const dataLoaded = await hostEvents();
                const sortDataLoaded = sortEventsAsc(dataLoaded.checkedEvent)
                setData(sortDataLoaded);
                
                const attendeesData = {}
                for (const event of sortDataLoaded){
                    const eventAttendees = await eventHostUserTrack(event.eventsid)
                    attendeesData[event.eventsid] = eventAttendees.rows[0].count
                }
                setAttendees(attendeesData)
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
        
    },[])

    const handleOnClick = (id) => {
        navigate(`/host/${id}/edit`)
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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h4">Your organisation upcoming events !</Typography>
            </Box>
            {data.map((event, index)=>(
            <Card key={index} sx={{ width: "80%", minWidth: "auto", backgroundColor: "#FDF2E9", mt: 2, ml: 13 }}>
                <CardActionArea sx={{display: "flex",}} onClick={() => {handleOnClick(event.eventsid)}}>                   
                    <CardMedia
                        component="img"
                        height="140"
                        image={event.image}
                        alt="green iguana"
                        sx={{ maxWidth: 300, height: 150, flexShrink: 0}}
                    />
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {event.eventname}, {event.type}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {event.location}, {event.country}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {event.datentime}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', ml: 25 }}>
                        {attendees[event.eventsid] || 0} / {event.attendees} Attendees
                        </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Container>
        
    )
}