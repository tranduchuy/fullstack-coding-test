import axios from 'axios';
import Cookie from 'js-cookie';
import {AccessToken} from 'constants/cookie-name';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 120 * 1000,
});

api.interceptors.request.use((config) => {
    config.headers = config.headers = {};
    config.headers.Authorization = Cookie.get(AccessToken) || '';
    return config;
})

