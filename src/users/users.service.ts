import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './userDTO';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {} 

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                id
            }
        });
    }

    async createUser(data: UserDto): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
        const newUser = await this.prisma.user.create({
            data: {
                username: data.username,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role,
            },
        });
    
        return newUser;
    }
}

