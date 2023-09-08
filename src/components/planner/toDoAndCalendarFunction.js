import { auth } from '../../config/firebase-config.js'
import { useState, useEffect, useLayoutEffect } from 'react'
import { addDoc, collection,doc,updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase-config.js'
import { useToast } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth'
      
  
export function useAuthToAddToDo(){
  const [ isLoading , setLoading ] = useState(false)
  const [ user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
    })})
  
  const toast = useToast();
  
  async function addToDo( 
    type,
    title,
    timeAndDate,
    other,
    workType
    ) {
    setLoading(true)
    await addDoc(collection(db, "userData", user.uid ,"to-do-list"), {
      type: type,
      title: title,
      timeAndDate : timeAndDate,
      workType: workType,
      other : other,
      finished : false,
      timestamp: Date.now(),
    }).then(() => {
    toast(
      {
        title: "Add Success",
        status: "success",
        isClosable: true,
          position: "top",
          duration: 5000,
      })  
      }).catch(err => {
      toast(
      {
        title: "Error, Server not response",
        status: err,
        isClosable: true,
          position: "top",
          duration: 5000,
      }
    )
    
  })
    setLoading(false)
}
  return { addToDo, isLoading }
}
export function useAuthToAddEvent(){
  const [ isLoading , setLoading ] = useState(false)
  const [ user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
    })})
  
  const toast = useToast();
  
  async function addEvent( 
    type,
    title,
    timeAndDate,
    other,
    eventType
    ) {
    setLoading(true)
    await addDoc(collection(db, "userData", user.uid ,"to-do-list"), {
      type: type,
      title: title,
      timeAndDate : timeAndDate,
      eventType: eventType,
      other : other,
      finished : false,
      timestamp: Date.now(),
    }).then(() => {
    toast(
      {
        title: "Add Success",
        status: "success",
        isClosable: true,
          position: "top",
          duration: 5000,
      })
    }
      ).catch(err => {
        toast(
      {
        title: "Error",
        status: err,
        isClosable: true,
          position: "top",
          duration: 5000,
      }
    )
  })
    setLoading(false)
}
  return { addEvent , isLoading }

}

export function useEdit(){
    const [ isLoading , setLoading ] = useState(false)
    const [ user, setUser] = useState()
    const toast = useToast();
    useEffect(() => {
      onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser)
    })})

    const edit = async (id, dataUpdate) => {
      setLoading(true)
      await updateDoc(doc(db, "userData", user.uid,"to-do-list", id)).then(() => {
        toast(
          {
            title: "Add Success",
            status: "success",
            isClosable: true,
              position: "top",
              duration: 5000,
          })
        }
          ).catch(err => {
            toast(
          {
            title: "Error",
            status: err,
            isClosable: true,
              position: "top",
              duration: 5000,
          }
        )
      })
        setLoading(false)
    }
      return { edit , isLoading }
}