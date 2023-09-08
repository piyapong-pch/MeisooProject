import {  Heading,  } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ShowCalendar from "../components/planner/calendar";
import ToDoComponent from "../components/planner/getToDoComponent";
import "./main.css"
import "./planner.css"
import Timer from "../components/meditation/usetimer";


export default function Planner() {
    return (
        <div className="planner">
            <div className="main-content">
            <Heading>Planner</Heading>
            <div className="display">
                <div class="planner-component"> 
                    <ToDoComponent/>
                </div>
                <div className="planner-component">
                <ShowCalendar/>
                </div>
            </div>
            </div>
        </div>
    )
}