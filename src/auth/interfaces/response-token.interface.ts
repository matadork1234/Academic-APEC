import { User } from "../entities/user.entity";

export interface IResponseToken {
    user: User;
    token: string;
}