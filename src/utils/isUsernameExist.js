import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default async function isUsernameExists(username){
    const q = query(collection(db, "userData"), where("username","==",username))
    const querySnapshot = await getDocs(q)
    return querySnapshot.size > 0
}