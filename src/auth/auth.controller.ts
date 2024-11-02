import { Body, Controller, Post, Res, HttpStatus, Req,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as moment from 'moment';
import { AuthDTO } from './authDTO';
import { RegisterSwagger, LoginSwagger, LogoutSwagger } from './auth.swagger';
import { LoginDTO } from './loginDTO';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    @RegisterSwagger()
    async register(
        @Body() body: AuthDTO,
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
    @LoginSwagger()
    async login(
        @Body() body: LoginDTO,
        @Res() res: Response,
    ) {
        try {
            const { access_token, user } = await this.authService.login(body);
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
    @LogoutSwagger()
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            interface CustomHeaders extends Headers {
                authorization?: string;
            }
            const token = (req.headers as CustomHeaders).authorization?.split(' ')[1];
            if (!token) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Token is missing',
                });
            }

            const blacklistData = await this.authService.logout(token)

            const formatLogout = {
                logoutAt : moment(blacklistData.createdAt).format('YYYY-MM-DD'),
            }

            return res.status(HttpStatus.OK).json({
                message: "Logout success", 
                data: formatLogout
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Logout failed',
                error: error.message,
            });
        }
    }
}
