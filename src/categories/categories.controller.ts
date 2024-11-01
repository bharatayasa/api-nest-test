import { Body, Controller, Get, HttpStatus, Param, Res, UseGuards, Post, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Response } from 'express';
import * as moment from 'moment';
import { CategoriesDTO } from './categoriesDTO';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCategoriesSwagger, GetCategoryByIdSwagger, AddCategoriesSwagger, UpdateCategoriesSwagger, DeleteCategoriesSwagger } from './categories.swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categories: CategoriesService){}

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard)
    @GetAllCategoriesSwagger()
    async getAllCategories(@Res() res: Response){
        try {
            const categories = await this.categories.findAllCategries()

            if (!categories || categories.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found"
                })
            }

            const formatData = categories.map(categorie => ({
                id        : categorie.id, 
                name      : categorie.name, 
                createdAt : moment(categorie.createdAt).format('YYYY-MM-DD'),
                updatedAt : moment(categorie.updatedAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: "success to get all categories data", 
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
    @GetCategoryByIdSwagger()
    async getCategoryId(@Param('id') id: string, @Res() res: Response) {
        try {
            const numericId = Number(id);
            const categori = await this.categories.findCategriesById(numericId)

            if (!categori) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'data not found',
                });
            }

            const formatData = {
                id        : categori[0].id, 
                name      : categori[0].name, 
                createdAt : moment(categori[0].createdAt).format('YYYY-MM-DD'),
                updatedAt : moment(categori[0].updatedAt).format('YYYY-MM-DD'),
            };            

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
    @AddCategoriesSwagger()
    async addCategories(@Body() body: CategoriesDTO, @Res() res: Response){
        try {
            const newCategories = await this.categories.createCategories(body)

            const formData = {
                name: newCategories.name
            }

            return res.status(HttpStatus.CREATED).json({
                message: "success to create categories", 
                data: formData
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed add data',
                error: error.message,
            });
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    @UpdateCategoriesSwagger()
    async updateCategories(
        @Param('id') id: string,
        @Body() body: CategoriesDTO, 
        @Res() res: Response, 
    ){
        const numericId = Number(id)
        try {
            const newCategories = await this.categories.updateCategories(numericId, body)
            const formData = {
                name: newCategories.name
            }
            return res.status(HttpStatus.OK).json({
                message: "success to update categories", 
                data: formData
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to update data by id',
                error: error.message,
            });
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    @DeleteCategoriesSwagger()
    async deleteCategories(@Param('id') id: string, @Res() res: Response){
        try {
            const numericId = Number(id)
            if (isNaN(numericId)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Invalid ID format",
                });
            }

            const deleteCategory = await this.categories.softDeleteCategory(numericId)

            const formatData = {
                deletedAt: moment(deleteCategory.deletedAt).format('YYYY-MM-DD'),
            };

            return res.status(HttpStatus.OK).json({
                message: "succes to delete category", 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to delete data',
                error: error.message,
            });
        }
    }
}
