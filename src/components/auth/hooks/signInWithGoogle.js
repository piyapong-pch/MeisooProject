import "firebase/auth"
import { Button, useToast } from "@chakra-ui/react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleSignIn } from "./auth";
import { APP, DASHBOARD } from "../../../routes/routes";
import { db } from "../../../config/firebase-config";
import { getDoc, doc, setDoc, query,collection,where,getDocs,addDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { GoogleFunction } from "./auth";
import { useEffect } from "react";

export default function Google(){
  const navigate = useNavigate()
  const { user,signInWithGoogle } = GoogleFunction()
    const handleChange = (e) => {
        signInWithGoogle()

    }
    return (
        <div className="login-with-google">
            <Button onClick={handleChange}>
                Login With Google
            </Button>
            
        </div>
    )

}