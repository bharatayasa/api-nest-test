import { Injectable } from '@nestjs/common';
import { News, NewsCategory } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { NewsDTO } from './newsDTO';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) {}

    async findAllNews(): Promise<(News & { category: NewsCategory | null })[]>{
        const getAllNews = await this.prisma.news.findMany({
            where: {
                deletedAt: null,
            },
            include: { 
                category: true
            },
        });
    
        return getAllNews;
    }

    async findNewsById(id: number): Promise<(News & { category: NewsCategory | null })[]>{
        const getAllNews = await this.prisma.news.findMany({
            where: {
                id,
                deletedAt: null,
            },
            include: { 
                category: true
            },
        });
    
        return getAllNews;
    }

    async addNews(data: NewsDTO): Promise<News>{
        const newsInput = await this.prisma.news.create({
            data: {
                title      : data.title, 
                content    : data.content, 
                categoryId : data.categoryId
            }
        })

        return newsInput
    }

    async updateNews(id: number, data: NewsDTO): Promise<News>{
        const newsUpdate = await this.prisma.news.update({
            where: {id},
            data: {
                title      : data.title, 
                content    : data.content, 
                categoryId : data.categoryId
            }
        })
    
        return newsUpdate
    }

    async deleteNews(id: number): Promise<News>{
        const deleteNews = await this.prisma.news.update({
            where: { id }, 
            data: {
                deletedAt: new Date()
            }
        })
    
        return deleteNews
    }
}
