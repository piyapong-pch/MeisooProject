import {
    Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Select,
   Button,
   useDisclosure,
   FormLabel,
   Input,
   useToast,
 } from '@chakra-ui/react'
 import { AddIcon } from '@chakra-ui/icons'
 import { useAuth } from "../auth/hooks/auth";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthToAddEvent, useAuthToAddToDo } from './toDoAndCalendarFunction';
import EmojiPicker, {Emoji} from 'emoji-picker-react';

export default function AddToDoWithCalendar(){
    const { user, isLoading: authLoading} = useAuth()
    const toast = useToast();
    const { addToDo , isLoading: ToDoLoading } = useAuthToAddToDo();
    const { addEvent, isLoading: EventLoading } = useAuthToAddEvent();
    const [ eventEmoji, setEventEmoji ] = useState('')
    const [ type, setType] = useState('')
    const [ workType, setWorkType] = useState('')
    const [ timeAndDate , setTimeAndDate] = useState({})
    const [ title, setTitle] = useState('')
    const [ other, setOther] = useState('')
    const [ eventType, setEventType] = useState('')
    const [ onSelectEmoji, setOnSelectEmoji] = useState('')

    function setDefault(){
        setType('')
        setWorkType('')
        setTimeAndDate({})
        setTitle('')
        setOther('')
    }
    /*function selectEmote(){
        re
    }

    function emojiPicking(event){
        return (
        <>
            <EmojiPicker searchDisabled onEmoji={e => setEventEmoji(e.target.value.unified)}/>
        </>
        )

    }*/
    function handleType(type){
        setType(type.target.value)
    }

    function handleWorkType(type){
        setWorkType(type.target.value)
    }
    

    function DisplayHiddenSection() {
        switch (type) {
            case "To-Do" : 
                return ToDoDisplay(); 
            case "Event":  
                return EventDisplay();
            default: 
        }
    }
    function DisplayOther(){
        if (workType === "Other") {
            return <>
                <FormLabel>To-Do Type</FormLabel>
                <Input type="text" value={other} placeholder='Type' onChange={(other) => { setOther(other.target.value)}} />
            </>
        }
    }
    
    function ToDoDisplay () {
        return (
            <>
                <FormLabel>Title :</FormLabel>
                    <Input type="text" onChange={(data) => setTitle(data.target.value)} required/>
                <FormLabel>Deadline :</FormLabel>
                    <Input type='time' onChange={(data) => setTimeAndDate((prev) => ({...prev,deadlineTime: data.target.value}))} required/>
                    <Input type='date' onChange={(data) => setTimeAndDate((prev) => ({...prev,deadlineDate: data.target.value}))} required/>
                <FormLabel>Work Type</FormLabel>
                    <Select onChange={handleWorkType} placeholder='--- Select Work type ---'>
                        <option value="Homework">Homework</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                    </Select>
                    { DisplayOther() }
            </>
        )
    }
function EventDisplay () {
        return (
            <>  
                <FormLabel>Title :</FormLabel>
                <Input type="text" onChange={(data) => setTitle(data.target.value)}/><br/>
                <FormLabel>Start:</FormLabel>
                <Input type='time' onChange={(data) => setTimeAndDate((prev) => ({...prev,startTime: data.target.value}))} />
                <Input type='date' onChange={(data) => setTimeAndDate((prev) => ({...prev,startDate: data.target.value}))}/>
                <FormLabel>End:</FormLabel>
                <Input type='time'  onChange={(data) => setTimeAndDate((prev) => ({...prev,endTime: data.target.value}))}/>
                <Input type='date' onChange={(data) => setTimeAndDate((prev) => ({...prev,endDate: data.target.value}))}/>
                <FormLabel>Type Event</FormLabel>
                <Select onChange={(data) => setEventType(data.target.value)} placeholder='--- Select event type ---'>
                    <option value="Seminar">Seminar</option>
                    <option value="Study">Study</option>
                    <option value="Exercise">Exercise</option>
                    <option value="Working">Working</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Hang Out">Hang Out</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Other">Other</option>
                </Select>
                { DisplayOther() }
            </>
        )
    }
    async function handleSubmitData (event) {
        event.preventDefault()
        if (type === 'To-Do'){
            addToDo (
                type,
                title,
                timeAndDate,
                other,
                workType
            )
            
        }
        else {
            addEvent(
                type,
                title,
                timeAndDate,
                other,
                eventType,
            )
        }
        setDefault()
        onClose()
   }

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
            <Button onClick={onOpen} _hover={{bg:"grey", color:"white"}} cursor="pointer"><AddIcon/></Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Add new To-Do or Events</ModalHeader>
                        <ModalCloseButton onClick={setDefault} />
                        <form onSubmit={handleSubmitData}>
                        <ModalBody>
                            <Select placeholder='Select' onChange={handleType}>
                                <option value="To-Do">To-Do</option>
                                <option value="Event">Event</option>
                            </Select>
                            <br/>
                            
                                { DisplayHiddenSection() } 
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' colorScheme='teal' isLoading={ToDoLoading||EventLoading}>Create</Button>
                        </ModalFooter>
                        </form>
                    </ModalContent>
            </Modal>
        </div>
    )
}