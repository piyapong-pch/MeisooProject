import { Box,  
    Card,
    Text, 
    CardBody,
    Heading, 
    Stack,
    CircularProgress, 
    CircularProgressLabel, 
    GridItem,
    Grid,  
    Button,
    CardFooter,
    HStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    ModalCloseButton
} from "@chakra-ui/react";
import CreateChallenge from "./AddChallenge";
import { GetChallenge } from "./ChallengeFunction";
import "./healthcare.css"
import { Link, useParams } from "react-router-dom";
import { BellIcon } from "@chakra-ui/icons";
import { useAuth } from "../auth/hooks/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { preventContextMenu } from "@fullcalendar/core/internal";
import { useSetNotification } from "./ChallengeFunction";
import { CHALLENGE } from "../../routes/routes";
import { useEffect } from "react";

export default function ChallengeComponent(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { setNoti } = useSetNotification();
    const challengeData = GetChallenge()

   function DisplayDetail (d) {
        return (
            <>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                        <ModalHeader>Challenge Details</ModalHeader>
                        <ModalCloseButton onClick={onClose} />

                        <ModalBody>
                            <Text>Title: {d.title}</Text>
                            <Text>Type: {d.type}</Text>
                            <Text>Recommendation: {d.recommendation}</Text>
                        </ModalBody>
                       </ModalContent>
                </Modal>
            </>
        )
   }
    
    function DisplayChallengeOnHeathCare(){

            if ( challengeData.length === 0) {
                return (
                <>
                    <Card minW="350">
                        <Text>Look like you don't have any work?</Text>
                        <Text>Press the AddIcon to add your work!</Text>
                    </Card>
                </>
            )
            }
        return (
            <>
                {
                    challengeData.map((d) => { 
                        const id = d.id;
                        function handleNotification() {
                            setNoti(id)
                        }
                        return (
                    <div key={d.title}>
                    <Card bg="white" style={{borderRadius: "0px"}}>
                        <CardBody >
                            <Grid templateColumns='repeat(6, 1fr)'  gap={5}>
                                <GridItem colSpan={5} w="100%">
                                <Stack>
                                    <Heading color="teal" >{d.title}</Heading>
                                </Stack>
                                </GridItem>

                                <GridItem colSpan={1} w="100%" >
                                </GridItem>
                            </Grid>
                        </CardBody>
                        <CardFooter bg="white">
                            <HStack>
                            <Button  as={Link} to={`${CHALLENGE}/${d.id}`} colorScheme="red">Do Challenge!</Button>
                            <Button  onClick={onOpen} colorScheme="gray">Details</Button>
                            <Button colorScheme="teal" onClick={handleNotification} variant={d.notification ? "outline" : "solid"}  ><BellIcon/>{d.notification ? "Cancel" : "Remind me"}</Button>
                            </HStack>
                        </CardFooter>
                    </Card>
                        {DisplayDetail (d)}
                    </div>
                )
                })}
            </>
            )}
    return (
        <div className="container">
            <Stack gap={4}>
            <Grid templateColumns='repeat(2, 1fr)'>
                <GridItem colSpan={1} >
                    <Heading textAlign="left" >Challenge</Heading>
                </GridItem>
                <GridItem colSpan={1} align="right">
                    <CreateChallenge/>
                </GridItem>
            </Grid>
            <Box className="list" p="3" bg='teal' style={{position: "sticky", overflow:"auto", borderRadius: "10px", borderTop:"none" }}>
                <Stack>
                {DisplayChallengeOnHeathCare()}
                </Stack>
            </Box>
            </Stack>

        </div>
        
    )
}