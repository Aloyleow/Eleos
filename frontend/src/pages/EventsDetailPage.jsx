import { useState, useEffect } from "react"
import { getOneEvent } from "../services/verifyServices"
import { useParams } from "react-router-dom"

export default function EventsDetailPage(){
    const { eventid } = useParams()
    const [data, setData] = useState()

    useEffect(()=>{
        const loadEvents = async() => {
            try{
                const data = await getOneEvent(eventid);
                setData(data.event[0]);
                
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[eventid])


    return (<>
    hello
    </>)
}