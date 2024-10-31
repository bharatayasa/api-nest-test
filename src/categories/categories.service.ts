import { Injectable } from '@nestjs/common';
import { NewsCategory } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { categoriesDTO } from './categoriesDTO';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService ){}

    async findAllCategries(): Promise<NewsCategory[]>{
        const getAll =  this.prisma.newsCategory.findMany({
            where: {
                deletedAt: null
            }
        })

        return getAll
    }

    async findCategriesById(id: number): Promise<NewsCategory[]>{
        const getById = this.prisma.newsCategory.findMany({
            where: {
                id,
                deletedAt: null
            }
        })

        return getById
    }

    async createCategories(data: categoriesDTO): Promise<NewsCategory>{
        const categoryInput = await this.prisma.newsCategory.create({
            data: {
                name: data.name
            }
        })

        return categoryInput
    }

    async updateCategories(id: number, data: categoriesDTO): Promise<NewsCategory | null> {
        const updateCategori = await this.prisma.newsCategory.update({
            where: { id },
            data: {
                name: data.name
            }
        });

        return updateCategori
    }

    async softDeleteCategory(id: number): Promise<NewsCategory>{
        const deleteCategory = this.prisma.newsCategory.update({
            where: {id}, 
            data: {
                deletedAt: new Date()
            }
        })

        return  deleteCategory
    }
}
