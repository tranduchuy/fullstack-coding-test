import {useEffect, useState} from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {UserContext} from 'components/User'
import {initializeApp} from "firebase/app";
import {getIdToken, getAuth} from 'firebase/auth';
import Cookie from 'js-cookie';


const firebaseConfig = {
    apiKey: "AIzaSyDPNgm2m2O70OUsPShcZ-FsgUHjZiuaQFs",
    authDomain: "fir-firebase-3f024.firebaseapp.com",
    databaseURL: "https://fir-firebase-3f024.firebaseio.com",
    projectId: "fir-firebase-3f024",
    storageBucket: "fir-firebase-3f024.appspot.com",
    messagingSenderId: "858803936063",
    appId: "1:858803936063:web:e55ae26cda1f10af8c518a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const MyApp = ({Component, pageProps}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        //getIdToken()
        //.then(res => {
        //console.log('auth info', res);
        //})
        /**
         * Here goes the logic of retrieving a user
         * from the backend and redirecting
         * an unauthorized user
         * to the login page
        */
        //setUser(result)
        //console.log(app);
    }, []);

    if (pageProps.protected && !user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <UserContext.Provider value={user}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider>
    )
};

export default MyApp;
