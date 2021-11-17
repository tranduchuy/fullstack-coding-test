import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
    Flex, Box, Heading, FormControl, Input, FormLabel, Button,
    Alert, AlertIcon, AlertDescription,
} from '@chakra-ui/react';
import Cookie from 'js-cookie';

const LoginPage = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(email, password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((usercredential) => {
                // signed in 
                const user = usercredential.user as any;
                // ...
                console.log('new user', user);
                Cookie.set('ftt_acccess_token', user.accessToken);
            })
            .catch((error) => {
                const errorcode = error.code;
                const errormessage = error.message;
                // ..
                console.error(error, errorcode);
                setErrorMsg(errormessage);
            });
    }

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Login</Heading>
                </Box>
                {
                    errorMsg.trim() !== '' && (
                        <Box my={4}>
                            <Alert status="error" borderRadius={4}>
                                <AlertIcon />
                                <AlertDescription>{errorMsg}</AlertDescription>
                            </Alert>
                        </Box>
                    )
                }
                <Box my={4} textAlign="left">
                    <form onSubmit={handleOnSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="test@test.com"
                                onChange={event => setEmail(event.currentTarget.value)} />
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="*******"
                                onChange={event => setPassword(event.currentTarget.value)}
                            />
                        </FormControl>
                        <Button type="submit" variant="outline" width="full" mt={4}>
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    )

}

export default LoginPage;
