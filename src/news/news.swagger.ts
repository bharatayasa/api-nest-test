import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { NewsDTO } from './newsDTO';

export function GetAllNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all news' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved all news data',
            schema: {
                example: {
                    message: "success to get news data",
                    data: [
                        {
                            id: 1,
                            title: "News Title 1",
                            content: "News Content 1",
                            category: "Category Name 1",
                            createdAt: "2024-01-01",
                            updatedAt: "2024-01-01",
                        },
                        {
                            id: 2,
                            title: "News Title 2",
                            content: "News Content 2",
                            category: "Category Name 2",
                            createdAt: "2024-01-02",
                            updatedAt: "2024-01-02",
                        },
                    ],
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'No news data found',
            schema: {
                example: {
                    message: "data not found",
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve news data',
            schema: {
                example: {
                    message: 'Failed to get news data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function GetNewsByIdSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get news by ID' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved news data by ID',
            schema: {
                example: {
                    message: "success to get news data by id",
                    data: {
                        id: 1,
                        title: "News Title",
                        content: "News Content",
                        category: "Category Name",
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01",
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'News data not found',
            schema: {
                example: {
                    message: "data not found",
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve news data',
            schema: {
                example: {
                    message: 'Failed to get news data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function AddNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Add a new news item' }),
        ApiBearerAuth(),
        ApiBody({
            description: 'News data to add',
            type: NewsDTO,
        }),
        ApiResponse({
            status: 201,
            description: 'Successfully added news data',
            schema: {
                example: {
                    message: "success to add data",
                    data: {
                        id: 1,
                        title: "New News Title",
                        content: "New News Content",
                        categoryId: 2,
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to add news data',
            schema: {
                example: {
                    message: 'Failed to add data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function UpdateNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Update news' }),
        ApiBearerAuth(),
        ApiBody({
            description: 'Updated news data',
            type: NewsDTO,
        }),
        ApiResponse({
            status: 200,
            description: 'Successfully updated news data',
            schema: {
                example: {
                    message: "success to update data",
                    data: {
                        id: 1,
                        title: "Updated News Title",
                        content: "Updated News Content",
                        categoryId: 2,
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'News data not found',
            schema: {
                example: {
                    message: "data not found",
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to update news data',
            schema: {
                example: {
                    message: 'Failed to update data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function DeleteNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete news' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully deleted news data',
            schema: {
                example: {
                    message: "success to delete data",
                    data: {
                        deletedAt: "2024-01-01",
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'News data not found',
            schema: {
                example: {
                    message: "data not found",
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to delete news data',
            schema: {
                example: {
                    message: 'Failed to delete data',
                    error: 'Error message here',
                },
            },
        }),
    );
}
