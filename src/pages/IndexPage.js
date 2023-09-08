import { Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { LOGIN,REGISTER } from "../routes/routes";
import "./main.css"

export default function IndexPage(){
    return (
        <div>
            <div>
                <Grid templateColumns='repeat(7, 1fr)' gap={3}>
                <GridItem colSpan={6}>
                <img className="mainlogo" src="/meisoo.png" width="100px" margin="20px"/>
                </GridItem>
                <GridItem colSpan={1} pt="30px" >
                    <HStack>
                <Button className="button" colorScheme="teal" as={Link} to={LOGIN} >Sign in</Button>
                <Button className="button"   as={Link} to={REGISTER} >Sign up</Button>
               </HStack> </GridItem>
            </Grid></div>
                <div>
                    <img src="/slide1.png" width="100%"/>
                    <img src="/slide2.png" width="100%"/>
                    <img src="/slide3.png" width="100%"/>
                    <img src="/slide4.png" width="100%"/>
                </div>
            <Outlet/>
        </div>
    )
}