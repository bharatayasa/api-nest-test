import { Body, Controller, Post, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as moment from 'moment';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(
        @Body() body: { username: string; name: string; email: string; password: any },
        @Res() res: Response
    ) {
        try {
            const newUser = await this.authService.register(body);

            const formatData = {
                username: newUser.username,
                name: newUser.name, 
                role: newUser.role, 
                createdAt: moment(newUser.createdAt).format('YYYY-MM-DD'),
            }

            return res.status(HttpStatus.CREATED).json({
                message: 'User registered successfully',
                data: formatData,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to register user',
                error: error.message,
            });
        }
    }

    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
        @Res() res: Response
    ) {
        try {
            const { access_token, user } = await this.authService.login(body.email, body.password);
            return res.status(HttpStatus.OK).json({
                message: 'Login successful',
                data: {
                    user: user,
                    token: access_token
                }
            });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Login failed',
                error: error.message,
            });
        }
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    async logout(@Req() req: Request) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        return this.authService.logout(token);
    }
}
