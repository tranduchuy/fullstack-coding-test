import {useEffect, useState} from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {UserContext} from 'components/User'
import {initializeApp} from "firebase/app";
import {getIdToken, getAuth} from 'firebase/auth';
import Cookie from 'js-cookie';
import { AppProvider, useAppDispatch, useAppState } from "../contexts/app.context";


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
    const appState = useAppState();

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

    console.log('user: ', appState.user);

    if (pageProps.protected && !appState.user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
      <ChakraProvider>
          <Component {...pageProps} />
      </ChakraProvider>
    )
};

const Container = (props) => {
    return (
      <AppProvider>
          <MyApp {...props} />
      </AppProvider>
    )
}

export default Container;
