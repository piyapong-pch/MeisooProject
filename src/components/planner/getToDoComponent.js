import { GetEventData, GetToDoList, useAuth } from "../auth/hooks/auth";
import { getUserId, useAuthToGetToDo } from "./toDoAndCalendarFunction";
import { Box , Button, Card,CardHeader, CardBody,Text, Heading, Stack, HStack} from "@chakra-ui/react"
import { color } from "framer-motion";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './toDoComponent.css'
import AddToDoWithCalendar from "./addToDoList";
import { EditIcon } from "@chakra-ui/icons";
import { useEdit } from "./toDoAndCalendarFunction";

export default function ToDoComponent(){
    //Declare State for displaying todo list
    const [type, setType] = useState("To-Do")
    const [isActiveToDo, setActiveToDo] = useState(true)
    const [isActiveEvent, setActiveEvent] = useState(false)
    //Declare get data from firestore
    const getToDo = GetToDoList()
    const getEvent = GetEventData()
    const { edit } = useEdit()

    function DisplayToDo(){
        if (type === "To-Do") {
            if ( getToDo.length === 0) {return (
                <>
                    <Card w="380">
                        <Text>Look like you don't have any work?</Text>
                        <Text>Press the AddIcon to add your work!</Text>
                    </Card>
                </>
            )
            }
            return (
                <>
                {
                    getToDo.map((d) => { 
                        return (
                            <>
                            <Card bg="teal" p="2" color="white" minW="350">
                                <HStack>
                                <Stack>
                                    <Heading size='md'>{d.title}</Heading>

                                    <Heading size='l'>
                                        Deadline! : 
                                        Time: {d.timeAndDate.deadlineTime + " "}
                                         
                                        Date: {d.timeAndDate.deadlineDate}
                                    </Heading>
                                </Stack>
                                </HStack>
                            </Card>
                            </>
                        )   
                    }) }
        
                </>
                )}}

        function DisplayEvent(){
            if (type === "Event") {
                if ( getEvent.length === 0) {
                    return (
                    <>
                        <Card minW="350">
                            <Text>Look like you don't have any work?</Text>
                            <Text>Press the AddIcon to add your work!</Text>
                        </Card>
                    </>
                )
                }
            return (
                <>
                    {
                        getEvent.map((d) => { return (
                        <Card bg="gray" colorScheme="white">
                            <CardBody>
                                <Heading size='md'>{d.title}</Heading>
                                <h1>{d.type}</h1>
                            </CardBody>
                        </Card>
                    )
                    })}
                </>
                )}}
    return (
        <div className="todo-container planner-element">
            <Stack>
            <Heading className="heading">To-Do List</Heading>
            <HStack spacing="70px"> 
            <div>
            <Button onClick={(event) => {setType("To-Do"); setActiveToDo(true); setActiveEvent(false);}}
            style={{
                backgroundColor: isActiveToDo ? '' : 'teal',
                color: isActiveToDo ? '' : 'white',
        }}>Your To-Do List</Button>
            <Button onClick={(event) => {setType("Event"); setActiveToDo(false); setActiveEvent(true);}} 
            style={{
                backgroundColor: isActiveEvent ? '' : 'teal',
                color: isActiveEvent ? '' : 'white',
        }}>Your Event</Button>
        </div>
        <AddToDoWithCalendar className="add-button"/>
        </HStack >
            <Box className="list" p="3" maxW='sm' bg='white' height="sm" style={{position: "sticky", overflow:"auto", borderRadius: "10px", borderTop:"none" }}>
                <Stack>
                {DisplayToDo()}
                {DisplayEvent()}
                </Stack>
            </Box>
            </Stack>
        </div>
    )
}