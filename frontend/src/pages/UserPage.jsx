import {Card, CardActionArea, CardContent ,Box, Container, CardMedia, Typography, Button,} from "@mui/material"
import { userEvents, cancelEvent, updateStars } from "../services/verifyServices"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sortEventsAsc } from "../utilities/functions"



export default function UserPage() {
    const navigate = useNavigate()
    const [testRefresh, setTestRefresh] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await userEvents();
                const sortData = sortEventsAsc(data)
                setData(sortData);            
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
        setTestRefresh(false)
    },[testRefresh])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                await updateStars();            
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
        
    },[])

   
    
    const cancelAttending = async (eventid) => {     
        try {
            await cancelEvent(eventid);
            setTestRefresh(true)
        } catch (err) {
            return err
        }
    }
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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h4">Events attending</Typography>
            </Box>
            {data.map((event, index) => (
                <Box key={index} sx={{ display: "flex" }}>
                    <Card sx={{ width: "80%", backgroundColor: "#FDF2E9", mt: 2, ml: 13, display: "flex" }}>
                        <CardActionArea sx={{ display: "flex", }} onClick={() => { handleOnClick(event.eventsid) }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={event.image}
                                alt="green iguana"
                                sx={{ maxWidth: 300, height: 150, flexShrink: 0 }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {event.eventname}, {event.type}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {event.location}, {event.country}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {event.datentime}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        <Button 
                        variant="outlined" 
                        onClick={() => { cancelAttending(event.eventsid) }}
                        color="black"
                        >Cancel</Button>
                    </Card>
                    
                </Box>
            ))}
        </Container>

    )
}