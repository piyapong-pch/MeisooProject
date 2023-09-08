import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GetAllPlannerData } from "../components/auth/hooks/auth";
import "./planner.css"
export default function FullPageCalendar(){
    
    const allList = GetAllPlannerData() 
    function handleEventReceive (){

    }
    return (
        <>
            <div className="main-content">
                <div classname="sidebar-draggable">
                    
                </div>
        
                <div className='fullcalendar'>

                <FullCalendar 
            plugins={ [dayGridPlugin, timeGridPlugin, interactionPlugin] } 
            initialView={"dayGridMonth"}
            events={
                allList.map((data) => {
                    const title = data.title;
                    if (data.type === "To-Do"){ 
                        const start = new Date(`${data.timeAndDate.deadlineDate} , ${data.timeAndDate.deadlineTime}:00`).toISOString()
                        return { title: title, start: start }
                        }
                    if (data.type === "Event"){ 
                        const start = new Date(`${data.timeAndDate.startDate} , ${data.timeAndDate.startTime}:00`).toISOString()
                        const end = new Date(`${data.timeAndDate.endDate} , ${data.timeAndDate.endTime}:00`).toISOString()
                        return { title: title, start: start, end: end }
                        } 
                    })
            }
            height='100%'
            aspectRatio="1"
            droppable="true"
            eventReceive={handleEventReceive}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
               />
            
                </div>
            </div>
        </>
    )
}