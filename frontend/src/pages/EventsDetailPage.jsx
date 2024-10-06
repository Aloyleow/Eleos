import { useState, useEffect } from "react"
import { getOneEvent, joinEvent, user_attendingsCount, checkUser_attendingsCount, isUserAttending } from "../services/verifyServices"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, CardMedia, Typography, Button } from "@mui/material"
//need to reorg the code, its very weird on getting the attendees count for now
export default function EventsDetailPage(){
    const navigate = useNavigate()
    const { eventsid } = useParams()
    const [data, setData] = useState([])
    const [attendees, setAttendees] = useState([])
    const [disable, setDisable] = useState(false)
    const [canJoin, setCanJoin] = useState(true)

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const oneEvent = await getOneEvent(eventsid);
                setData(oneEvent[0]);
                const userAttendingThisEvent = await isUserAttending(eventsid)
                if (userAttendingThisEvent === 1){
                    setDisable(true)
                }
                           
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
                const checkAttendees = await checkUser_attendingsCount(eventsid)
                if (attendees.rows[0].count >= checkAttendees.userAttendings.rows[0].attendees){
                    setCanJoin(false)
                }                        
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
                    <Box sx={{ justifyContent: "center", display: "flex", width: "300px", height: "30px"}}>
                        {disable && <Typography color="#FF6F61">You are Attending!</Typography>}
                    </Box>
                    {canJoin && <Button 
                    disabled={disable} 
                    variant="contained" 
                    onClick={join} 
                    size="large" 
                    sx={{
                        height: 100, 
                        width: 300, 
                        backgroundColor: "#FF6F61"
                    }}>Join Now!</Button>}
                </Box>

            </Box>

        </Container>
    
)}