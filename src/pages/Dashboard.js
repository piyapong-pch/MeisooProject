import Sidebar from "../components/Sidebar.js"
import TopBar from "../components/TopBar.js"
import ToDoComponent from "../components/planner/getToDoComponent.js"
import './main.css'
import { useEffect,useLayoutEffect } from "react"
import { useAuth } from "../components/auth/hooks/auth.js"
import Timer from "../components/meditation/timer.js"
import { HStack, Heading, Stack } from "@chakra-ui/react"
import ChallengeComponent from "../components/healthcare/ChallengeComponent";

export default function Dashboard() {
   const { user, isLoading} = useAuth()
    if (isLoading) return;
    /* eslint-disable-next-line no-restricted-globals */
    if (screen.width > 1000) {
    
    return (
        <div className="dashboard">
            <div className="main-content">
                <h1>Hello, {user.username}</h1>
                <HStack>
               <ToDoComponent/>
               <Stack>
                <Heading>Meditation</Heading>
                <Timer/>
                <ChallengeComponent/>
               </Stack>
                </HStack>
            </div>
            
        </div>
    )
    } else {
        <div className="dashboard">
        <div className="main-content">
            <h1>Hello, {user.username}</h1>
            
           <ToDoComponent/>
           <Stack>
            <Timer/>
            <ChallengeComponent/>
           </Stack>
          
        </div>
        
    </div>
    }

}