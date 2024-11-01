import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { NewsService } from './news.service';
import * as moment from 'moment';
import { NewsDTO } from './newsDTO';

@Controller('news')
export class NewsController {
    constructor(private readonly news: NewsService){}

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getAllNews(@Res() res: Response){
        try {
            const news = await this.news.findAllNews()

            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }

            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                content   : item.content,
                category  : item.category.name,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
                updatedAt : moment(item.updatedAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: "success to get news data", 
                data: formatData
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get all news data',
                error: error.message,
            });
        }
    }

    @Get(':id')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getNewsById(@Param('id') id: string, @Res() res: Response){
        try {
            const numericId = Number(id);
            const news = await this.news.findNewsById(numericId)

            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }
            
            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                content   : item.content,
                category  : item.category.name,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
                updatedAt : moment(item.updatedAt).format('YYYY-MM-DD'),
            }))
            
            return res.status(HttpStatus.OK).json({
                message: "success to get news data by id", 
                data: formatData
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get all news data',
                error: error.message,
            });
        }
    }

    @Post()
    @Roles('admin')
    @UseGuards(AuthGuard)
    async addNews(@Res() res: Response, @Body() body: NewsDTO){
        try {
            const addNews = await this.news.addNews(body);

            const formData = {
                id         : addNews.id, 
                title      : addNews.title, 
                content    : addNews.content, 
                categoryId : addNews.categoryId
            }

            return res.status(HttpStatus.CREATED).json({
                message: "success to add data", 
                data: formData
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to add data',
                error: error.message,
            });
        }
    }

    @Put(':id')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async updateNews(
        @Param('id') id: string, 
        @Body() body: NewsDTO, 
        @Res() res: Response
    ){
        try {
            const numbericId = Number(id)
            const updateNews = await this.news.updateNews(numbericId, body)

            const formData = {
                id         : updateNews.id, 
                title      : updateNews.title, 
                content    : updateNews.content, 
                categoryId : updateNews.categoryId
            }

            return res.status(HttpStatus.OK).json({
                message: "success to update data",
                data: formData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to update data',
                error: error.message,
            });
        }
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async deleteNews(@Res() res: Response, @Param('id') id: string){
        try {
            const numericId = Number(id)
            const deleteNews = await this.news.deleteNews(numericId)

            const formatData = {
                deletedAt: moment(deleteNews.deletedAt).format('YYYY-MM-DD'),
            };

            return res.status(HttpStatus.OK).json({
                message: "success to delete data", 
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
