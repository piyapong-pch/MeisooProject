import { Avatar, Button, Code, Heading } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../config/firebase-config";
import { getDoc, doc, query } from "firebase/firestore";
import { useAuth } from "./auth/hooks/auth";
import LoadingApp from "./webpage/LoadingApp";
import { LoadingOverlay } from "../pages/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DASHBOARD, HEALTHCARE, MEDITATION,PLANNER, PROFILE,EACHPROFILE } from "../routes/routes";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { GetDataUser } from "./auth/hooks/auth";
import './userComponent.css'

export default function UserComponent(){
    const { user,isLoading } = useAuth(auth)
    if(isLoading) return (
        <div className="avatar-div">
            <Avatar className="stack" size="xl" src="" _hover={{cursor: "pointer", opacity : "0.8", name:"Edit Profile" }}/> <br/>
            <Code className="stack">@profilecode</Code>
            <h1 className="email-display stack">user email</h1>
        </div>
    )
    return(
        <div className="avatar-div">
            <Avatar className="stack" as={Link} to={`${PROFILE}/${user.id}`} name={user.username} size="xl" src={user.avatar} _hover={{cursor: "pointer", opacity : "0.8", name:"Edit Profile" }} /> <br/>
            <Code className="stack" fontSize="16px" as={Link} to={`${PROFILE}/${user.id}`}>@{user.username}</Code>
            <h1 className="email-display stack">{user.email}</h1>
        </div> 
    )
}
