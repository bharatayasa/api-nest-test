import { VisitorService } from './../visitor/visitor.service';
import { Controller, Get, HttpStatus, Param, Res, UseGuards, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import * as moment from 'moment';
import { ApiTags } from '@nestjs/swagger';
import { GetNewsListSwagger, GetDetailNewsSwagger, GetNewsByCategorySwagger, SearchNewsSwagger} from './visitor.swagger';

@ApiTags('visitor')
@Controller('visitor')
export class VisitorController {
    constructor( private readonly news: VisitorService ){}

    @Get()
    @Roles('user')
    @UseGuards(AuthGuard)
    @GetNewsListSwagger()
    async GetNewsList(@Res() res: Response){
        try {
            const news = await this.news.findNewsList()
            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }

            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                category  : item.category.name,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: "Succec to get all news list", 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get news list',
                error: error.message,
            });
        }
    }

    @Get('/detail/:id')
    @Roles('user')
    @UseGuards(AuthGuard)
    @GetDetailNewsSwagger()
    async GetDetailNews( @Res() res: Response, @Param('id') id: string){
        try {
            const numericId = Number(id)

            const news = await this.news.findDetailNews(numericId)
            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }

            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                category  : item.category.name,
                content   : item.content,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: `Succec to get detail news by id of ${id}`, 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get detail news',
                error: error.message,
            });
        }
    }
    
    @Get('/filterby/:category')
    @Roles('user')
    @UseGuards(AuthGuard)
    @GetNewsByCategorySwagger()
    async GetNewsByCategory( @Res() res: Response, @Param('category') category: string ){
        try {

            const news = await this.news.findNewsByCategory(category)
            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }

            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                category  : item.category.name,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: `Success to get news by category of ${category}`,
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to get news by category',
                error: error.message,
            });
        }
    }

    @Post('/search')
    @Roles('user')
    @UseGuards(AuthGuard)
    @SearchNewsSwagger()
    async searchNews(
        @Body('keyword') keyword: string, 
        @Res() res: Response
    ){
        try {
            const news = await this.news.searchNews(keyword)
            if (!news || news.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "data not found", 
                    data: news
                })
            }

            const formatData = news.map(item => ({
                id        : item.id,
                title     : item.title,
                category  : item.category.name,
                createdAt : moment(item.createdAt).format('YYYY-MM-DD'),
            }))

            return res.status(HttpStatus.OK).json({
                message: `Success to search news keyword of ${keyword}`, 
                data: formatData
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Failed to search news',
                error: error.message,
            });
        }
    }
}
