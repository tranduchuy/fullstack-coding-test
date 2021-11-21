export type AuthInfo = {
    email: string;
    name: string;
    isAdmin: boolean;
    birthday: string;
}

export type SignUpReqDto = {
    email: string;
    name: string;
    birthday: string;
    password: string;
}
