import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SearchNewsDTO } from './searchDTO'

export function GetNewsListSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all news' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved all news',
            schema: {
                example: {
                    message: "Success to get all news list",
                    data: [
                        {
                            id: 1,
                            title: "News Title",
                            category: "Category Name",
                            createdAt: "2024-01-01",
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
                    data: null,
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve news',
            schema: {
                example: {
                    message: 'Failed to get news list',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function GetDetailNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get news detail by ID' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved news detail',
            schema: {
                example: {
                    message: "Success to get detail news by id of 1",
                    data: {
                        id: 1,
                        title: "News Title",
                        category: "Category Name",
                        content: "News Content",
                        createdAt: "2024-01-01",
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
                    data: null,
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve news detail',
            schema: {
                example: {
                    message: 'Failed to get detail news',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function GetNewsByCategorySwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get news by category' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved news by category',
            schema: {
                example: {
                    message: "Success to get news by category of Tech",
                    data: [
                        {
                            id: 1,
                            title: "News Title",
                            category: "Tech",
                            createdAt: "2024-01-01",
                        },
                    ],
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'No news found for the specified category',
            schema: {
                example: {
                    message: "data not found",
                    data: null,
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve news by category',
            schema: {
                example: {
                    message: 'Failed to get news by category',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function SearchNewsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Search news by keyword' }),
        ApiBearerAuth(),
        ApiBody({
            type: SearchNewsDTO
        }),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved news matching the keyword',
            schema: {
                example: {
                    message: "Success to search news keyword of 'Tech'",
                    data: [
                        {
                            id: 1,
                            title: "News Title",
                            category: "Tech",
                            createdAt: "2024-01-01",
                        },
                    ],
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'No news found matching the keyword',
            schema: {
                example: {
                    message: "data not found",
                    data: null,
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to search news',
            schema: {
                example: {
                    message: 'Failed to search news',
                    error: 'Error message here',
                },
            },
        }),
    );
}
