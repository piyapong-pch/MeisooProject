import { Button } from "@chakra-ui/react"
import { LogOut } from "../components/auth/hooks/auth"
import "./main.css"
import { useEffect } from "react"
import { useAuth } from "../components/auth/hooks/auth"
import { useNavigate } from "react-router-dom"
import { LOGIN } from "../routes/routes"
import { useParams } from "react-router-dom"

export default function Profile(){
    let { userId } = useParams()
    const {user,isLoading} = useAuth()
    const navigate = useNavigate()
    const { signedOut } = LogOut()
    const handleClick = () => {
        signedOut()
    }
     return (
        <div className="main-content">
            <Button onClick={handleClick}>Log Out</Button>
        </div>
    )
}