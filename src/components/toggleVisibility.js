import { HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./sidebar.css"
import "../pages/main.css"
import { useLocation } from "react-router-dom";

export default function ToggleVisibility({ children }) {
    const [show, setShow] = useState(); 
    const location = useLocation()
    const [ prevLocation, nextLocation ] = useState('')
    useEffect(() => {
      if (location.pathname !== prevLocation ){
        nextLocation(location.pathname)
        if (window.innerWidth > 980) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    },[location.pathname,prevLocation])
    useEffect(()=> {
      var main = document.querySelector(":root")
      if (show === false) {
        main.style.setProperty("--main-margin","0")
        main.style.setProperty("--main-width","100%")
      } 
      if (show === true) {
        main.style.setProperty("--main-width","80%")
        main.style.setProperty("--main-margin","20%")
    }
    },[show])

    function toggleShow() {
        setShow(!show);
      }
    return (
      
      <div className="component-container"> 
        <div className="nav-button"><Button  onClick={toggleShow}><HamburgerIcon/></Button></div>
        {show && children}
      </div>
    );
  }