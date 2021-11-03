export interface iUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    roles?: string[];
    active?: boolean;
    enabled?: boolean;
    otpCode?: number;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
