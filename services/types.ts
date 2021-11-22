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

export type PostInfo = {
    id: string;
    title: string;
    imageSrc: string;
    content: string;
}

