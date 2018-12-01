export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
    isAdmin: boolean;
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
}