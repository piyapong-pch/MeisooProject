import { Checkbox } from "@chakra-ui/checkbox";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DrinkingManual(){
    const [snapHour, setHour] = useState()
    const [snapMinute, setMinute] = useState()
    const { auth, isLoading } = useAuth(); 
    if (isLoading) return;
    const allMilliLiter = auth.weight * 2.2 * 30/2 
    const today = new Date();

    const listDayNeeded = [
        {
            title : "After wake-up",
            drinking : `2 Cup or around ${allMilliLiter}` ,
            time : `${snapHour} + ":" + ${snapMinute} - ${snapHour + 2} + ":" + ${snapMinute}`,
            timeHour : snapHour + 2,
            timeMinutes : snapMinute,
            checked : false,
            waitForOpen : false
        },
    ]

    const handleChecked = (e) => { 
        
    }
   
    return (
    <>
    <Heading>Water drinking checker</Heading>
    <Text>This checker uses data from <Link>HSRI</Link> and adapt for all people.</Text>
    <Text>We recommend to drink by little along the day and check when the time is ready for you.</Text>
    <Text>1 Cup (Around 200 - 250 mL)</Text>
   
    {
    
        listDayNeeded.map((data) => {
        if (data.checked === true) {
        return (
            <>
                <Checkbox onChange={handleChecked} isDisabled={data.checked && data.waitForOpen}>{data.title}</Checkbox>
            </>
        )
        }})
    }
    </>
    )
}