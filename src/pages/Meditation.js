import { Heading } from "@chakra-ui/react";
import Timer from "../components/meditation/timer";



export default function Meditation() {
    return (
        <div>
            <div class="main-content">
                <div className="setup-meditation">
                    <Heading>Set up your focus.</Heading><br/>
                    <Timer/>
                </div>

                <div className="playlist">
                    {/* all user playlist and add playlist*/}
                </div>  
            </div>
        </div>
    )
}