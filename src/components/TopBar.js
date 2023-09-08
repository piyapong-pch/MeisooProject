import { Button, Icon, Popover, PopoverTrigger,PopoverBody,PopoverHeader,PopoverArrow,PopoverContent,PopoverCloseButton } from '@chakra-ui/react'
import Clock from './dashboard/clock'
import './topbar.css'
import { Link, useLocation } from 'react-router-dom'
import { APP, LOGIN, REGISTER, ROOT, SETTING } from '../routes/routes'
import { SettingsIcon,BellIcon } from '@chakra-ui/icons'

export default function TopBar(){
    const location = useLocation()
    /*function handleClick(event){
        const element = document.getElementsByClassName("sidebar")
        element.style.visibility = "visible"
    }*/
    
    if(location.pathname === REGISTER || location.pathname === ROOT || location.pathname === LOGIN || location.pathname === APP ) {
        return null
    }

    
    return (
        <div className="topbar">
            <div>
                <img className='logo' src="/meisoo.png" alt="ไม่ติด" width="75px"/>
                <img className='text-logo' src="/textlogo.png" alt="ไม่ติด" width="100px"/>
                <Popover>
                  <PopoverTrigger>
                    <Button className='icon-button' fontSize='20px' width="45px" height="45px" padding="4px"><BellIcon/></Button>
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                    <PopoverHeader pt={4} fontWeight='bold' border='0'>
                        Notifications
                    </PopoverHeader>
                    <PopoverCloseButton />
                <PopoverBody>
                    
                </PopoverBody>
            
                </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}