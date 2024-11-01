import { Injectable } from '@nestjs/common';
import { News, NewsCategory } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VisitorService {
    constructor(private prisma: PrismaService){}

    async findNewsList(): Promise<(News & { category: NewsCategory | null })[]>{
        const getNewsList = await this.prisma.news.findMany({
            where: {
                deletedAt: null
            },
            include: { 
                category: true
            },
            orderBy: {
                id: 'desc'
            }
        })

        return getNewsList
    }

    async findDetailNews(id: number): Promise<(News & { category: NewsCategory | null })[]>{
        const getNewsList = await this.prisma.news.findMany({
            where: {
                id,
                deletedAt: null
            },
            include: { 
                category: true
            }
        })

        return getNewsList
    }

    async findNewsByCategory(category: string): Promise<(News & { category: NewsCategory })[]> {
        const getNewsList = await this.prisma.news.findMany({
            where: {
                category: {
                    name: category
                },
                deletedAt: null,
            },
            include: { 
                category: true,
            },
            orderBy: {
                id: 'desc'
            }
        });
    
        return getNewsList;
    }

    async searchNews(keyword: string): Promise<(News & { category: NewsCategory | null })[]> {
        const searchResults = await this.prisma.news.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { title: { contains: keyword } },
                ]
            },
            include: {
                category: true
            },
            orderBy: {
                id: 'desc'
            }
        });
    
        return searchResults;
    }
}
