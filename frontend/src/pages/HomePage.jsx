import { useEffect } from "react"

export default function HomePage({handleSignOut}){

    useEffect (() => {
        handleSignOut()
      },[])



    return (<>
    Home


    
    
    </>
)}