import { Response } from 'express';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { UserDto } from './userDTO';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getAllUsers(@Res() res: Response) {
        try {
            const users = await this.usersService.findAll()

            if (!users || users.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: users
                })
            }

            const formatData = users.map(user => ({
                id       : user.id,
                username : user.username, 
                name     : user.name,
                email    : user.email,
                role     : user.role, 
                createdAt: moment(user.createdAt).format('YYYY-MM-DD'),
                updatedAt: moment(user.updatedAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: "Success to get data by admin",
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get all data',
                error: error.message,
            });
        }
    }

    @Get(':id')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string, @Res() res: Response){
        try {
            const numericId = Number(id);

            const users = await this.usersService.findOne(Number(numericId));

            if (!users) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'data not found',
                    data: users
                });
            }

            const formatData = {
                id       : users[0].id, 
                username : users[0].username, 
                name     : users[0].name,
                email    : users[0].email,
                role     : users[0].role, 
                createdAt: moment(users[0].createdAt).format('YYYY-MM-DD'),
                updatedAt: moment(users[0].updatedAt).format('YYYY-MM-DD'),
            }

            return res.status(HttpStatus.OK).json({
                message: "success to get data by id", 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get data by id',
                error: error.message,
            });
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @Roles('admin')
    async addUser(@Body() body: UserDto, @Res() res: Response){
        try {
            const newUser = await this.usersService.createUser(body)

            const formData = {
                username : newUser.username, 
                name     : newUser.name, 
                email    : newUser.email, 
                role     : newUser.role
            }

            return res.status(HttpStatus.CREATED).json({
                message: "Successful to create user", 
                data: formData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to create data',
                error: error.message,
            });
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    async updateUser(
        @Param('id') id: string,
        @Body() Body: UserDto, 
        @Res() res: Response,
    ){
        try {
            const numericId = Number(id)

            if (isNaN(numericId)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Invalid ID format",
                });
            }

            const updateUser = await this.usersService.updateUser(numericId, Body)

            const formatData = {
                id: updateUser.id, 
                username: updateUser.username, 
                name: updateUser.name, 
                role: updateUser.role
            }

            return res.status(HttpStatus.OK).json({
                message: "success to update user", 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to update data',
                error: error.message,
            });
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        try {
            const numericId = Number(id);
            if (isNaN(numericId)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Invalid ID format",
                });
            }
            const deletedUser = await this.usersService.softDelete(numericId);
            const formatData = {
                deletedAt: moment(deletedUser.deletedAt).format('YYYY-MM-DD'),
            };
            return res.status(HttpStatus.OK).json({
                message: "User deleted successfully", 
                data: formatData
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'failed to delete user',
                error: error.message,
            });
        }
    }
}
