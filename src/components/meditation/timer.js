import React, { useState, useEffect } from "react"; 
import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";  
import { setConsent } from "firebase/analytics";

export default function Timer() {
  const [counter, setCounter] = useState(120);
  const [start, setStart] = useState(false);
  const [minutes,setMinutes] = useState(0)
  const [seconds,setSeconds] = useState(0)
  useEffect(() => {
    if (start) counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, start]);
  function handleTime(){
    setCounter( parseInt(minutes)+parseInt(seconds) )
    setStart(!start)
  }
  return (
    <div className="App">
      <Stack spacing={6}>
      <Text>Please don't reload this page.</Text>
      <HStack>
      <Input type="number" max="99" placeholder="minute" onChange={(e)=>{setMinutes(e.target.value * 60)}} />
      <Text>:</Text>
      <Input type="number" max="59" placeholder="second" onChange={(e)=>{setSeconds(e.target.value)}}/>
      </HStack>      
      <Button onClick={handleTime}>{start ? "Stop" : "Start"}</Button>
      </Stack>

      <div>Timer: {!start ? "In stop" : `${Math.floor(counter/60) } : ${counter%60}`}</div>
    </div>
   );
  }