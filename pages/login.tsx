import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
    Flex, Box, Heading, FormControl, Input, FormLabel, Button,
    Alert, AlertIcon, AlertDescription,
} from '@chakra-ui/react';
import Cookie from 'js-cookie';
import { useAppDispatch } from "contexts/app.context";
import { AccessToken } from "constants/cookie-name";
import { ActionTypes } from "contexts/actions";
import Router from 'next/router';
import { FullPageSpinner } from "../components/FullPageSpinner";

const LoginPage = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const appDispatch = useAppDispatch();

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(email, password);
            const auth = getAuth();
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {
                  const {email, displayName} = userCredential.user;
                  const accessToken = await userCredential.user.getIdToken();
                  appDispatch({
                      type: ActionTypes.SIGN_IN,
                      payload: {
                          email, displayName, accessToken
                      }
                  })

                  Cookie.set(AccessToken, accessToken);
                  await Router.push('/');
              })
              .catch((error) => {
                  const errorcode = error.code;
                  const errormessage = error.message;
                  // ..
                  console.error(error, errorcode);
                  setErrorMsg(errormessage);
              })
              .finally(() => {
                  setLoading(false);
              })
        } catch (e) {
            setErrorMsg(e.message);
        }
    }

    return (
        <>
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
            {
                loading && <FullPageSpinner />
            }
        </>
    )

}

export default LoginPage;
