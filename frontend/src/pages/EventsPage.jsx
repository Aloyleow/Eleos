import { useState, useEffect } from "react"
import { getEvents } from "../services/verifyServices"
import { Container, Typography, Card, CardContent, CardActionArea, CardMedia, TextField, Select, FormControl, MenuItem, InputLabel, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { sortEventsAsc }  from "../utilities/functions"

export default function EventsPage({countries, types, user, humanType}) {
    const [events, setEvents] = useState([])
    const [search, setSearch] = useState("")
    const [selectCountry, setSelectCountry] = useState("")
    const [selectType, setSelectType] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await getEvents();
                const sortData = sortEventsAsc(data)
                setEvents(sortData);

            } catch (error) {
                console.error(error.message);
            }
        }
            
        loadEvents()
        
    },[])

    const handleOnClick = (id) => {
        if (!user){
            navigate("/login")
        } else if (user && humanType === "user"){
            navigate(`/event/${id}`)
        } else if (user && humanType === "host"){
            navigate(`/event/host/${id}`)
        }
    }
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filterEvent = events.filter(event => 
        (event.eventname.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.type.toLowerCase().includes(search.toLowerCase()) ||
        event.country.toLowerCase().includes(search.toLowerCase()) ||
        event.datentime.toLowerCase().includes(search.toLowerCase())) &&
        (selectCountry === "" || event.country === selectCountry) &&  
        (selectType === "" || event.type === selectType) 
    )

    const handleFilterCountry = (event) => {
        setSelectCountry(event.target.value)
    }

    const handleFilterType = (event) => {
        setSelectType(event.target.value)
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
            <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2
              }}
            >
            <Typography variant="h4">List of Upcoming Events</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly"
              }}
            >
            <TextField placeholder="Search..." value={search} onChange={handleSearch}></TextField>
            <FormControl>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            name="country"      
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"                            
                            sx={{width: 200}}
                            label="country"
                            onChange={handleFilterCountry}
                            value={selectCountry}
                        >
                            <MenuItem value="">All Countries</MenuItem>
                            {countries.map((name, index) => (
                                <MenuItem key={index} value={name}>{name}</MenuItem>
                            ))}
                            
                        </Select>
            </FormControl>
            <FormControl>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            name="type"      
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"                            
                            sx={{width: 200}}
                            label="type"
                            onChange={handleFilterType}
                            value={selectType}
                        >
                            <MenuItem value="">All Types</MenuItem>
                            {types.map((name, index) => (
                                <MenuItem key={index} value={name}>{name}</MenuItem>
                            ))}          
                        </Select>
            </FormControl>
            </Box>
            {filterEvent.map((event, index)=>(
            <Card key={index} sx={{ width: "80%", minWidth: "auto", backgroundColor: "#FDF2E9", mt: 2, ml: 13 }}>
                <CardActionArea sx={{display: "flex",}} onClick={() => {handleOnClick(event.eventsid)}}>                   
                    <CardMedia
                        component="img"
                        height="140"
                        image={event.image}
                        alt="green iguana"
                        sx={{ height: 180, width: 300, flexShrink: 0}}
                    />
                    <CardContent sx={{flex: 1, display: "flex", flexDirection: "column"}}>
                        <Typography gutterBottom variant="h5" component="div" color="#FF6F61">
                            {event.eventname}, {event.type}
                        </Typography>
                        <Typography>By {event.orgname}</Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {event.location}, {event.country}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {event.attendees} People needed.  {event.datentime}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Container>
        
    )
}