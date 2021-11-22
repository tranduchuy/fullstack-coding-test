import React, {useEffect, useState} from "react";
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
import Router, {useRouter} from "next/router";
import {useAppState} from "contexts/app.context";
import {FullPageSpinner} from "components/FullPageSpinner";
import {SignUpReqDto} from "services/types";
import {api} from "services/api";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";

const SignUpPage = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState('1993-01-29');
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const appState = useAppState();
    const router = useRouter();
    const toast = useToast();

    const handleOnSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const body: SignUpReqDto = {
                email,
                password,
                birthday,
                name
            }
            setLoading(true);
            await api.post('/user/sign-up', body);
            toast({
                title: 'Sign up successfully',
                description: 'Please login',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            Router.push('/login');
        } catch (e) {
            setErrorMsg((e as AxiosError).response?.data?.message || e.message);
        } finally {
            setLoading(false);
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
                                    onChange={event => setName(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl mt={6} isRequired>
                                <FormLabel>Birthday</FormLabel>
                                <Input type="date"
                                    value={birthday}
                                    onChange={event => setBirthday(event.currentTarget.value)}
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
