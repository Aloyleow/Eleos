import {Card, CardActionArea, CardContent ,Box, Container, CardMedia, Typography,} from "@mui/material"
import download from "../images/download.jpg"
import { userEvents } from "../services/verifyServices"
import { useState, useEffect } from "react"



export default function UserPage() {
    const [data, setData] = useState([])

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await userEvents();
                setData(data.userattendings);            
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[])
    
    
    
    // onClick={() => {handleOnClick(event.eventsid)}}
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
            <Typography>Events attending</Typography>
            {data.map((event, index)=>(
            <Card key={index} sx={{ width: "80%", minWidth: "auto", backgroundColor: "#FDF2E9", mt: 2, ml: 13 }}>
                <CardActionArea sx={{display: "flex",}}>                   
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
                            {event.attendees} Attendees
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Container>
        
    )
}