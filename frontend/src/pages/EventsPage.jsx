import { useState, useEffect } from "react"
import { getEvents } from "../services/verifyServices"
import { Container, Box, Typography, Card, CardContent, CardActionArea, CardMedia } from "@mui/material"




export default function EventsPage() {
    const [events, setEvents] = useState([])

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
    


    return (
        <Container
            sx={{
                height: "80vh",
                backgroundColor: "burlywood",
                justifyContent: "center",
                alignContent: "center"
            }}

        >
            <Card sx={{ maxWidth: 1000 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        
    )
}