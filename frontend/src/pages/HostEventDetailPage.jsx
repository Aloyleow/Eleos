
import { useState, useEffect } from "react"
import { getOneEvent,user_attendingsCount} from "../services/verifyServices"
import { useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography} from "@mui/material"

// V2 ABLE TO VIEW USERS NAME AND IC, INVITE USERS, BLOCK USERS, DELETE USERS

export default function HostEventDetailPage(){
    const { eventsid } = useParams()
    const [data, setData] = useState([])
    const [attendees, setAttendees] = useState([])
 

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const oneEvent = await getOneEvent(eventsid);
                setData(oneEvent.event[0]);
                const attendees = await user_attendingsCount(eventsid)
                setAttendees(attendees.rows[0])
                                
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[eventsid])
    

    return (
    
        <Container
            sx={{ 
                height: "90vh", 
                display: "flex" 
            }}
        >
            <Box
                sx={{ 
                    display: "flex", 
                    flexGrow: 1, 
                    flexDirection: "column", 
                    alignItems: "center", 
                    maxWidth: "100%" 
                }}
            >
                <Box sx={{ 
                    display: "flex", 
                    flexGrow: 1, 
                    justifyContent: "center", 
                    alignItems: "center", 
                    width: 600
                }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={data.image}
                        alt="Event Image"
                        sx={{ maxWidth: 300, minWidth: 300, flexShrink: 0 }}
                    />
                </Box>
                <Box sx={{ 
                    display: "flex", 
                    flexGrow: 1, 
                    flexDirection: "column", 
                    alignItems: "start",
                     maxWidth: 600
                }}>
                    <Typography variant="h6" sx={{mb: 5}} color="#FF6F61">More info:</Typography>
                    <Typography sx={{wordBreak: "break-word", width: 600, fontSize: "18px"}} color="#333333">{data.comments}</Typography>
                </Box>
            </Box>
            <Box
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    flexGrow: 1, 
                    maxWidth: 500
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: 500, height: 80
                }}>
                    <Typography variant="h6" sx={{ alignSelf: "start" }} color="#FF6F61">Event name: </Typography>
                    <Typography sx={{fontSize: "25px"}} color="#333333">{data.eventname}</Typography>
                    <Typography variant="h6" sx={{ alignSelf: "start" }} color="#FF6F61">Event type: </Typography>
                    <Typography sx={{fontSize: "25px"}} color="#333333">{data.type}</Typography>
                    <Typography variant="h6" sx={{ alignSelf: "start" }} color="#FF6F61">Date and time: </Typography>
                    <Typography sx={{fontSize: "25px"}} color="#333333">{data.datentime}</Typography>
                    <Typography variant="h6" sx={{ alignSelf: "start" }} color="#FF6F61">Location: </Typography>
                    <Typography sx={{ wordBreak: "break-word", fontSize: "25px" }} color="#333333">{data.location}</Typography>
                </Box>
                <Box sx={{ 
                    display: "flex", 
                    flexGrow: 1, 
                    flexDirection: "column", 
                    justifyContent: "space-evenly", 
                    alignItems: "center", 
                    width: 500, 
                    maxHeight: 300 
                }}>
                    <Typography>Current attendees: {attendees.count}/{data.attendees}</Typography>
                </Box>

            </Box>

        </Container>
    
)}