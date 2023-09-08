import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../config/firebase-config.js'
import { useState, useEffect, useLayoutEffect } from 'react'
import { APP, DASHBOARD, LOGIN } from '../../../routes/routes.js'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { setDoc,doc,getDoc,getDocs,query,where,collection,docs, orderBy,limit, addDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase-config.js'
import isUsernameExists from '../../../utils/isUsernameExist.js'
import { signOut } from 'firebase/auth'
import {  GoogleAuthProvider } from 'firebase/auth'

export function useAuth(){
  
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "userData", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading,authUser]);

  return { user, isLoading, error };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    
    async function login({email, password,redirectTo=`..${APP}`}) {
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
              title: "You are logged in",
              status: "success",
              isClosable: true,
              position: "top",
              duration: 5000,
            });
            navigate(redirectTo);
          } catch (error) {
            toast({
              title: "Logging in failed",
              description: error.message,
              status: "error",
              isClosable: true,
              position: "top",
              duration: 5000,
            });
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }
      
        return { login, isLoading };
      }

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {


      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "userData", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
          firstName:"",
          lastName:"",
          email:res.user.email,
          height:"",
          weight:"",
          BMI:"",
        });

        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}


export const GetDataUser = () => {
  let [userData , setUserData ] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = doc(db, "userData",currentUser.uid)
        const snapData = await getDoc(ref)
        setUserData(snapData.data())
      });
  });
  return userData;
};


export function GetToDoList(){
  let [toDoData , setToDoData ] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = query(collection(db, "userData",currentUser.uid, "to-do-list"), where("type","==","To-Do"))
        const snapData = await getDocs(ref)
        const data = snapData.docs.map( (d) => ({
          ...d.data()
        }))
        setToDoData(data)
    })},[toDoData]);
    
    return toDoData; 
}

export function GetEventData(){
  let [eventData , setEventData ] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = query(collection(db, "userData",currentUser.uid, "to-do-list"), where("type","==","Event"))
        const snapData = await getDocs(ref)
        const data = snapData.docs.map( (d) => ({
          ...d.data()
        }))
        setEventData(data)
    })},[eventData]);
    
    return eventData; 
}

export function GetAllPlannerData(){
  let [allData , setAllData ] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = collection(db, "userData",currentUser.uid, "to-do-list")
        const snapData = await getDocs(ref)
        const data = snapData.docs.map( (d) => ({
          ...d.data()
        }))
        setAllData(data)
    })},[]);
    
    return allData; 
}



export function FilterNearestToDoOrEvent(){
  let [nearest , setNearest ] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      // Check if currentUser is null
        const ref = query(collection(db, "userData",currentUser.uid, "to-do-list"),orderBy("startDate"), orderBy("deadlineDate"),orderBy("deadlineTime"),orderBy("startTime"),limit(5))
        const snapData = await getDocs(ref)
        const data = snapData.docs.map( (d) => ({
          ...d.data()
        }))
        setNearest(data)
    })},[]);
    
    return nearest; 
}

// 


 export const LogOut = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const signedOut = async () => {
    signOut(auth).then(() => {
      navigate(LOGIN)
      toast(
        {
          title: "Sign Out Successfully",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        }
      )
    }).catch(err => {
      toast(
        {
          title: "Sign Out Failed",
          description: err.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        }
      )
    });
  }
  return { signedOut }
}

export function GoogleFunction(){
const [user, setUser] = useState()
const toast = useToast()
const navigate = useNavigate()
const googleProvider = new GoogleAuthProvider()
useEffect(()=> {
  onAuthStateChanged(auth, async (user)=> {
    if (user) {
    const onBackEnd = await getDoc(doc(db, "userData", user.uid))
    const onBackEndData = onBackEnd.data()
    console.log(onBackEndData)
    if (onBackEndData === undefined) {
      await setDoc(doc(db, "userData", user.uid),{
        id: user.uid,
        username: user.displayName.toLowerCase().split(" ").join(""),
        authProvider: "google",
        email: user.email,
        avatar: "",
        date: Date.now(),
        firstName:"",
        lastName:"",
        height:"",
        weight:"",
        BMI:"",
      })
    }}
  })
},[])

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    setUser(user);
    navigate(DASHBOARD)
    }
   catch (err) {
    toast(
      {
        title: "Sign in failed",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      }
    )
  }
};
return { user, signInWithGoogle}

}