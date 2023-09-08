import { useEffect, useState } from "react";

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
  Heading,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { useAuthToAddChallenge } from "./ChallengeFunction";
import { AddIcon } from "@chakra-ui/icons";

export default function CreateChallenge(){

   const { addChallenge , addChallengeExercise,addChallengeExerciseWithBodyWeight, isLoading: addingChallenge } = useAuthToAddChallenge()

   const { isOpen, onOpen, onClose } = useDisclosure()
   // setState 
   const [ title, setTitle] = useState("")
   const [challengeType, setChallengeType] = useState("")
   const [exerciseType, setExerciseType] = useState("")
   const [bodyweight, setBodyWeight] = useState("")
   const [ endDate, setEndDate] = useState("")
   const [ dayTime, setDayTime] = useState([])
   const setDefault = () => {
      setChallengeType("")
      setExerciseType("")
      setBodyWeight("")
    }

   const handleExerciseType = (type)=> {
      setExerciseType(type.target.value)
      console.log(type.target.value)
   }
   const handleChallengeType = (type) => {
      setChallengeType(type.target.value)
      console.log(type.target.value)
   }

   const handleBodyWeight = (type) => {
      setBodyWeight(type.target.value)
      console.log(type.target.value)
   }
   const SelectBodyWeightPosture = () => {
      if (exerciseType === 'Bodyweight') {
         return ( 
         <>
            <FormLabel>Bodyweight Exercise</FormLabel>
            <Select placeholder="--Choose your specific for your workout--" value={bodyweight} onChange={handleBodyWeight}>
               <option value="Abs">Abs</option>
               <option value="Quads">Quads</option>
               <option value="Glutes">Glutes</option>
               <option value="Triceps">Triceps</option>
               <option value="Biceps">Biceps</option>
               <option value="Back">Back</option>
               <option value="Chest">Chest</option>
               <option value="Full-Body">Full Body</option>
            </Select>
            <br/>
         </>
         )
   }}

  

   const SelectExerciseType = () => {
      if (challengeType === 'Exercise') {
         return (
            <>
               <FormLabel>Workout Challenge</FormLabel>
               <Select value={exerciseType} onChange={handleExerciseType} placeholder="-- Choose your exercise--"> 
                  <option value="Cardio">Cardio</option>
                  <option value="HITT">HITT</option>
                  <option value="Bodyweight">Bodyweight</option>
                  <option value="Stretching">Stretching</option>
               </Select>
               <br/>
           </>
         )} 
   }
   
   const Close = () => {
      setDefault()
      onClose()
   }


   function handleAddChallenge (event){
      event.preventDefault()
      
      if (exerciseType == 'Bodyweight') {
         addChallengeExerciseWithBodyWeight(
            challengeType,
            exerciseType,
            bodyweight,
         ) } 
      else if (challengeType != 'Exercise') {
         addChallengeExercise(
            challengeType,
            exerciseType,
         )
      }
      else {
         addChallenge(
            challengeType
         )
      }
         setDefault()
         onClose()
   }

   return (
      <>
        <Button onClick={onOpen}><AddIcon/></Button>

         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent> 
               <ModalHeader>Create Challenge</ModalHeader>
               <ModalCloseButton onClick={Close}/>
            <form onSubmit={handleAddChallenge}>
               <ModalBody pb={15}>
               <FormLabel>Title</FormLabel>
               <Input type="text" />
               <FormLabel>Type of challenge</FormLabel>
               <Select value={challengeType} onChange={handleChallengeType}>
                  <option value="Eat">Eat</option>
                  <option value="Drink">Drink</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Sleep">Sleep</option>
               </Select>
               <br/>
               { SelectExerciseType() }
               { SelectBodyWeightPosture() }
               </ModalBody>
               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={Close}>
                  Close
                  </Button>
                  <Button colorScheme='teal' type="submit" isLoading={ addingChallenge } loadingText="Creating">
                  Create
                  </Button>
               </ModalFooter> 
               </form>
            </ModalContent>
         </Modal>
      </>
   )
}