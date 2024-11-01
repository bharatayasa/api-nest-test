import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesDTO } from './categoriesDTO';

export function GetAllCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all categories' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved all categories',
            schema: {
                example: {
                    message: "success to get all categories data",
                    data: [
                        {
                            id: 1,
                            name: "Category 1",
                            createdAt: "2024-01-01",
                            updatedAt: "2024-01-01",
                        },
                        {
                            id: 2,
                            name: "Category 2",
                            createdAt: "2024-01-01",
                            updatedAt: "2024-01-01",
                        },
                    ],
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'No categories found',
            schema: {
                example: {
                    message: "data not found",
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve categories',
            schema: {
                example: {
                    message: 'Failed to get all data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function GetCategoryByIdSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get category by ID' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved category',
            schema: {
                example: {
                    message: "success to get data by id",
                    data: {
                        id: 1,
                        name: "Category 1",
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01",
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Category not found',
            schema: {
                example: {
                    message: 'data not found',
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to retrieve category',
            schema: {
                example: {
                    message: 'Failed to get data by id',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function AddCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new category' }),
        ApiBearerAuth(),
        ApiBody({ type: CategoriesDTO }),
        ApiResponse({
            status: 201,
            description: 'Successfully created category',
            schema: {
                example: {
                    message: "success to create categories",
                    data: {
                        name: "New Category",
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to create category',
            schema: {
                example: {
                    message: 'Failed add data',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function UpdateCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Update category' }),
        ApiBearerAuth(),
        ApiBody({ type: CategoriesDTO }),
        ApiResponse({
            status: 200,
            description: 'Successfully updated category',
            schema: {
                example: {
                    message: "success to update categories",
                    data: {
                        name: "Updated Category",
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Category not found',
            schema: {
                example: {
                    message: 'Failed to update data by id',
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to update category',
            schema: {
                example: {
                    message: 'Failed to update data by id',
                    error: 'Error message here',
                },
            },
        }),
    );
}

export function DeleteCategoriesSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete category' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully deleted category',
            schema: {
                example: {
                    message: "succes to delete category",
                    data: {
                        deletedAt: "2024-01-01",
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Category not found',
            schema: {
                example: {
                    message: 'Failed to delete data',
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to delete category',
            schema: {
                example: {
                    message: 'Failed to delete data',
                    error: 'Error message here',
                },
            },
        }),
    );
}
