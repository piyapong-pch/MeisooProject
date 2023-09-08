import "./main.css"
import { GetChallenge, GetChallengePrototype } from "../components/healthcare/ChallengeFunction";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import Timer from "../components/meditation/timer";

export default function HealthCareChallenge(){
    const { id } = useParams()
    const challengeData = GetChallengePrototype(id);
    



    if (challengeData.type === "Exercise"){
    return (
        <div className="main-content">
            <Card>
                <CardHeader>
                    <Heading>{challengeData.title}</Heading>
                    
                </CardHeader>
                <CardBody>
                    <Timer/>
                </CardBody>
            </Card>
        </div>
    )
    }
    if (challengeData.type === "Drink"){
        return (
            <div className="main-content">
                This is an drink 
            </div>
        )
    }
    if (challengeData.type === "Eat"){
        return (
            <div className="main-content">
                This is an eat challenge
            </div>
        )
    }
    if (challengeData.type === "Sleep"){
        return (
            <div className="main-content">
                This is an sleep challenge
            </div>
        )
    }
    
}