import {Card, CardActionArea, CardContent ,Box, Container, CardMedia, Typography, Button,} from "@mui/material"
import {  hostEventsHistory } from "../services/verifyServices"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"



export default function HostEventHistoryPage() {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await hostEventsHistory();
                setData(data.checkedEventsHistory);            
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
            <Typography>Events attended</Typography>
            {data.map((event, index)=>(
            <Card key={index} sx={{ width: "80%", minWidth: "auto", backgroundColor: "#FDF2E9", mt: 2, ml: 13 }}>
                <CardActionArea sx={{display: "flex",}} onClick={() => {handleOnClick(event.eventsid)}}>                   
                    <CardMedia
                        component="img"
                        height="140"
                        image={event.image}
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
                        <Typography gutterBottom variant="h6" component="div">
                            {event.datentime}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Container>       
    )
}