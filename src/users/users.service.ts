import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './userDTO';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {} 

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    async findOne(id: number): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                id,
                deletedAt: null
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

    async updateUser(id: number, data: UserDto): Promise<User | null> {
        const saltRounds = 10;
    
        if (data.password) {
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
    
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    password: data.password,
                },
            });
    
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }

    async softDelete(id: number): Promise<User>{
        return this.prisma.user.update({
            where: {id}, 
            data: {
                deletedAt: new Date()
            } 
        })
    }
}