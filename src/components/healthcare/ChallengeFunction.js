import { useState, useEffect } from "react"
import { auth, db } from "../../config/firebase-config"
import { useToast } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, query,limit, orderBy, getDocs, doc ,setDoc, getDoc, updateDoc,onSnapshot,where } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useAuth } from "../auth/hooks/auth";

export function useAuthToAddChallenge(){
    const [ isLoading , setLoading ] = useState(false)
    const [ user, setUser] = useState()
    const toast = useToast();
    const id = uuidv4()
    useEffect(() => {
      onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser)
      })})
    
    
    //
    async function addChallengeExerciseWithBodyWeight( 
        type,
        exercise,
        bodyweight
    ) 
      {
      setLoading(true)
      await setDoc(doc(db, "userData", user.uid ,"challenge",id), {
        id: id,
        type: type,
        title: exercise,
        bodyweight: bodyweight,
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
      ) })
      setLoading(false)
       }

    // 

    async function addChallengeExercise (
        type,
        challenge) 
        {
        setLoading(true)
        await setDoc(doc(db, "userData", user.uid ,"challenge",id), {
          id: id,
          type: type,
          title: challenge,
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
          ;}).catch(err => {
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

    async function addChallenge (type) 
        {
        
        setLoading(true)
        const ref = doc(db, "userData", user.uid ,"challenge",id)
        await setDoc(ref, {
          id: id,
          type: type,
          title: "challenge",
          finished : false,
          timestamp: Date.now(),
        }
        ).then(() => {
        toast(
          {
            title: "Add Success",
            status: "success",
            isClosable: true,
              position: "top",
              duration: 5000,
          })  
          ;})
          .catch(err => {
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
   
    return { addChallenge, addChallengeExercise , addChallengeExerciseWithBodyWeight, isLoading }
}


export function GetChallenge(){
    let [allChallenge, setAllChallenge ] = useState([])
  
    useEffect(() => {
      onAuthStateChanged(auth, async (currentUser) => {
        // Check if currentUser is null
          const ref = collection(db, "userData",currentUser.uid, "challenge")
          const snapData = await getDocs(ref)
          const allData = snapData.docs.map(doc => ({
            ...doc.data()
          }))
           setAllChallenge(allData)

      })},[]);
      
      return allChallenge; 
  }

  export function useSetNotification(){
    const setNoti = async (id) => {
      onAuthStateChanged(auth, async (currentUser) => {
        // Check if currentUser is null
          const ref = doc(db, "userData",currentUser.uid, "challenge", id)
          const refDoc = await getDoc(ref)
          const notification = refDoc.data().notification
          if (notification === undefined && notification === false) {
            await updateDoc(ref, 
              { notification: true}) 
        }
          else {
            await updateDoc(ref, { notification: !notification })
        }
        });
  }

    return { setNoti }  
}

export function GetChallengePrototype(id){
  let [challenge, setChallenge ] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = doc(db, "userData",currentUser.uid, "challenge", id)
        const snapData = await getDoc(ref)
        const allData = snapData.data()
        setChallenge(allData)
    })},[id]);
    
    return challenge; 
}