import { Role } from '@prisma/client';

export interface UserDto {
    username : string;
    name     : string;
    email    : string;
    password : string;
    role?    : Role;
}
