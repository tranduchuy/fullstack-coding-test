import {useEffect} from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {AppProvider, useAppDispatch, useAppState} from "contexts/app.context";
import firebase from 'firebase/initFireBase';
import {api} from 'services/api';
import Cookie from 'js-cookie';
import {AccessToken} from 'constants/cookie-name';
import {useRouter} from 'next/router';
import {AuthInfo} from 'services/types';
import {ActionTypes} from 'contexts/actions';

firebase();

const MyApp = ({Component, pageProps}) => {
    const appState = useAppState();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pageProps.protected && !appState.user) {
            api.get<AuthInfo>('user/info')
                .then(res => {
                    console.log(res);
                    dispatch({type: ActionTypes.SIGN_IN, payload: res.data});
                })
                .catch(() => {
                    Cookie.remove(AccessToken)
                    router.push('/login');
                })
        }
    }, []);

    if (pageProps.protected) {
        if (!appState.user) {
            return (
                <div>Loading...</div>
            )
        } else if (!appState.user.isAdmin) {
            router.push('/');
        }
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
