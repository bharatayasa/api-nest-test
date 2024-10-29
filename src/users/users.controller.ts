import { Response } from 'express';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(){}

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getAllUsers(@Res() res: Response) {
        try {
            return res.status(HttpStatus.OK).json({
                message: "yeee succes to get by admin"
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get all data',
                error: error.message,
            });
        }
    }

}
