import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async validateToken(token: string): Promise<any> {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is missing or undefined');
        }
        try {
            const decoded = this.jwtService.verify(token, { secret });
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async register(data: { username: string; name: string; email: string; password: any; 
    }): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        const newUser = await this.prisma.user.create({
            data: {
                username: data.username,
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }
        });

        return newUser;
    }

    async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
    
        const user = await this.prisma.user.findFirst({
            where: { email: email },
        });
    
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
    
        const payload = { id: user.id, email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload, { secret: jwtSecret });
    
        return { 
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role
            },
            access_token
        };
    }

    async logout(token: string): Promise<{ message: string }> {
        const decodedToken = this.jwtService.decode(token) as any;
        const expiresAt = new Date(decodedToken.exp * 1000);

        await this.prisma.invalidToken.create({
            data: { token, expiresAt },
        });

        return { message: 'Logged out successfully' };
    }

    async isTokenValid(token: string): Promise<boolean> {
        const invalidToken = await this.prisma.invalidToken.findUnique({
            where: { token },
        });
        return !invalidToken;
    }
}
