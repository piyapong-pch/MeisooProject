import React, { useEffect } from 'react';
import { Center, 
    Box, 
    Heading, 
    Input,
    FormControl, 
    FormLabel, 
    FormErrorMessage,
    Button,
    Link, 
    Text } from '@chakra-ui/react'
import { REGISTER, APP, DASHBOARD } from '../../routes/routes';
import { Link as RouterLink, useNavigate, useLocation} from "react-router-dom"
import { useAuth, useLogin } from './hooks/auth'
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate } from '../../utils/form-validate.js';
import Google from './hooks/signInWithGoogle';

export default function Login(){
    const { user, isLoading: authLoading } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const {login , isLoading} = useLogin();
    const { 
        register,  
        handleSubmit, 
        reset, 
        formState:{errors} } = useForm()
    
    useEffect(() => {
        if (authLoading) {
              // maybe trigger a loading screen
              return;
        }
            if (user) navigate(DASHBOARD);
          }, [user, authLoading]);
    async function handleLogin(data){
        login(
            {email: data.email,
            password: data.password,
            redirectTo: DASHBOARD
        })
    }

    
    return (
        <Center w="100%" h="100vh" >
            <Box mx="1" maxW="md" borderWidth="1px" p="9" borderRadius="1px">
                <Heading mb="4" size="lg" textAlign="center">Log In</Heading>
                
                <form onSubmit={handleSubmit(handleLogin)}>

                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" 
                        placeholder="user@example.com"
                        {...register("email", emailValidate)}
                        />
                       
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    
                    </FormControl>

                    <FormControl isInvalid={errors.password} py="2">

                        <FormLabel>Password</FormLabel>

                        <Input type="password" placeholder="user_1234"

                        {...register("password", passwordValidate)}/>

                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    
                    </FormControl>

                    <Button mt="4" type="submit" colorScheme="teal" size="md" w="full" 
                    isLoading={isLoading} 
                    loadingText="Logging In">
                        Log In
                    </Button>

                </form>


                <Google/>
                <Text fontSize="xlg" align="center" mt="6"> Don't have an account? {""}
                    <Link as={RouterLink} to={REGISTER} color='teal.800' fontWeight="medium" textDecor="underline" _hover={{color:"white",background: "teal.800",borderRadius:"3px",padding:"3px"}}>Register</Link>
                {""} instead!
                </Text>
            </Box>
        </Center>
    )

}