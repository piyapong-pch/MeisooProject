import { Button } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CreateChallenge from "../components/healthcare/AddChallenge";
import { Outlet } from "react-router-dom";
import ChallengeComponent from "../components/healthcare/ChallengeComponent";

export default function HealthCare() {
    return (
        <div>
            <div class="main-content">
                <Button className="achivement"></Button>
                <ChallengeComponent/>
                {/*<div className="chat-to-bot">
                    In progress: Time to deploy test 15 Aug
                </div>*/}
            </div>
        </div>
    )
}