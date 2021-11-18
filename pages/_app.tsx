import {useEffect, useState} from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import { AppProvider, useAppState } from "../contexts/app.context";
import firebase from 'firebase/initFireBase';

firebase();

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
