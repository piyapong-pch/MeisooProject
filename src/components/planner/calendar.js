import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Fullcalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuthToGetToDo } from './toDoAndCalendarFunction';
import { GetAllPlannerData } from '../auth/hooks/auth';
import { CALENDAR } from '../../routes/routes';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "./toDoComponent.css"
import { useEffect, useState } from 'react';

export default function ShowCalendar(){
    const allList = GetAllPlannerData() 
    

    return (
        <div className='calendar planner-element'>
            <Button as={Link} to={CALENDAR} className="navigate-button">See your full calendar</Button>
            <Fullcalendar 
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
            aspectRatio="1"
            dayMaxEvents={true}
               />
            
        </div>
    )
}