import React, {useEffect, useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Heading, Alert, AlertIcon, AlertDescription,
    Link,
} from "@chakra-ui/react";
import Cookie from "js-cookie";
import {ActionTypes} from "contexts/actions";
import {AccessToken} from "constants/cookie-name";
import Router, {useRouter} from "next/router";
import {useAppDispatch, useAppState} from "contexts/app.context";
import {FullPageSpinner} from "../components/FullPageSpinner";

const SignUpPage = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const appDispatch = useAppDispatch();
    const appState = useAppState();
    const router = useRouter();

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(email, password);
            const auth = getAuth();
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const {email, displayName} = userCredential.user;
                    const accessToken = await userCredential.user.getIdToken();
                    appDispatch({
                        type: ActionTypes.SIGN_IN,
                        payload: {
                            email, displayName, accessToken,
                        },
                    });

                    Cookie.set(AccessToken, accessToken);
                    await Router.push("/");
                })
                .catch((error) => {
                    const errorcode = error.code;
                    const errormessage = error.message;
                    // ..
                    console.error(error);
                    setErrorMsg(errormessage);
                })
                .finally(() => {
                    setLoading(false);
                })
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    useEffect(() => {
        if (appState.user) {
            router.push('/')
        }
    }, [appState.user])

    return (
        <>
            <Flex width="full" align="center" justifyContent="center">
                <Box p={6}>
                    <Box textAlign="center">
                        <Heading>Sign up</Heading>
                    </Box>

                    {
                        errorMsg.trim() !== "" && (
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
                                <Input type="email" placeholder="test@test.com" width={350}
                                    onChange={event => setEmail(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl mt={6} isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="*******"
                                    onChange={event => setPassword(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl mt={6} isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" placeholder="Your name"
                                    onChange={event => setPassword(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl mt={6} isRequired>
                                <FormLabel>Birthday</FormLabel>
                                <Input type="date"
                                    onChange={event => setPassword(event.currentTarget.value)}
                                />
                            </FormControl>
                            <Button type="submit" variant="outline" width="full" mt={4}>
                                Sign In
                            </Button>
                        </form>
                    </Box>
                    <Box mt={6}>
                        <Link href="/login"> Go to login page </Link>
                    </Box>
                </Box>
            </Flex>
            {
                loading && <FullPageSpinner />
            }
        </>
    );
};

export default SignUpPage;
