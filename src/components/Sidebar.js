import Meditation from "../pages/Meditation";
import { DASHBOARD, HEALTHCARE, MEDITATION,PLANNER, PROFILE, SETTING } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import './sidebar.css'
import UserComponent from "./userComponent";
import { useLocation } from "react-router-dom";
import { REGISTER, LOGIN,ROOT, APP } from "../routes/routes";
import ToggleVisibility from "./toggleVisibility";
import AudioPlayer from "./meditation/musicplayer/audioplayer";

export default function Sidebar(){
    const location = useLocation()

    if(location.pathname === REGISTER || location.pathname === ROOT || location.pathname === LOGIN || location.pathname === APP || location.pathname === SETTING) {
        return null
    }
    return (
        <ToggleVisibility>
        <div class="sidebar">
            <UserComponent/>
            <div class="nav-section ">
                <Link to={`../${DASHBOARD}`}><div className={location.pathname.startsWith("/app/dashboard")? "nav-click" : "nav-list"}>
                    <span>DASHBOARD</span>
                    </div>
                    </Link>
                <Link to={`../${HEALTHCARE}`}><div className={location.pathname.startsWith("/app/healthcare")? "nav-click" : "nav-list"}>
                    <span> HEALTHCARE</span>
                    </div></Link>
                <Link to={`../${MEDITATION}`}><div className={location.pathname.startsWith("/app/meditation")? "nav-click" : "nav-list"}>
                    <span> MEDITATION</span>
                    </div></Link>
                <Link to={`../${PLANNER}`}><div className={location.pathname.startsWith("/app/planner")? "nav-click" : "nav-list"}>
                    <span> PLANNER</span>
                    </div></Link>
            </div>
            <div class="music-player">
                <AudioPlayer/>
            </div>
        </div>
        </ToggleVisibility>
    )
}