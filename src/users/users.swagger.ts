import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserDTO } from './userDTO';

export function GetAllUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all users (role admin)' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved all users',
            schema: {
                example: {
                    message: "Success to get data by admin",
                    data: [
                        {
                            id: 1,
                            username: "john_doe",
                            name: "John Doe",
                            email: "john@example.com",
                            role: "admin",
                            createdAt: "2024-01-01",
                            updatedAt: "2024-01-01",
                        },
                        {
                            id: 2,
                            username: "jane_doe",
                            name: "Jane Doe",
                            email: "jane@example.com",
                            role: "user",
                            createdAt: "2024-01-01",
                            updatedAt: "2024-01-01",
                        },
                    ]
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Data not found',
            schema: {
                example: {
                    message: "data not found",
                    data: []
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to get all data',
            schema: {
                example: {
                    message: 'Failed to get all data',
                    error: 'Error message here'
                }
            }
        })
    );
}

export function GetUserByIdSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get user by ID (role admin)' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Successfully retrieved user by ID',
            schema: {
                example: {
                    message: "success to get data by id",
                    data: {
                        id: 1,
                        username: "john_doe",
                        name: "John Doe",
                        email: "john@example.com",
                        role: "admin",
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01",
                    }
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'User not found',
            schema: {
                example: {
                    message: 'data not found',
                    data: null
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to get user by ID',
            schema: {
                example: {
                    message: 'Failed to get data by id',
                    error: 'Error message here'
                }
            }
        })
    );
}

export function AddUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new user (role admin)' }),
        ApiBearerAuth(),
        ApiBody({
            type: UserDTO,
            description: 'User data to create a new user',
        }),
        ApiResponse({
            status: 201,
            description: 'User created successfully',
            schema: {
                example: {
                    message: "Successful to create user",
                    data: {
                        username: "john_doe",
                        name: "John Doe",
                        email: "john@example.com",
                        role: "admin"
                    }
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to create user',
            schema: {
                example: {
                    message: 'Failed to create data',
                    error: 'Error message here'
                }
            }
        })
    );
}

export function UpdateUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Update an existing user (role admin)' }),
        ApiBearerAuth(),
        ApiBody({
            type: UserDTO,
            description: 'User data to update the existing user',
        }),
        ApiResponse({
            status: 200,
            description: 'User updated successfully',
            schema: {
                example: {
                    message: "success to update user",
                    data: {
                        id: 1,
                        username: "john_doe",
                        name: "John Doe",
                        role: "admin"
                    }
                }
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid ID format',
            schema: {
                example: {
                    message: "Invalid ID format"
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'User not found',
            schema: {
                example: {
                    message: 'data not found',
                    data: null
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to update user',
            schema: {
                example: {
                    message: 'Failed to update data',
                    error: 'Error message here'
                }
            }
        })
    );
}

export function DeleteUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete a user (role admin)' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'User deleted successfully',
            schema: {
                example: {
                    message: "User deleted successfully",
                    data: {
                        deletedAt: "2024-01-01"
                    }
                }
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid ID format',
            schema: {
                example: {
                    message: "Invalid ID format"
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'User not found',
            schema: {
                example: {
                    message: 'failed to delete user',
                    data: null
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to delete user',
            schema: {
                example: {
                    message: 'failed to delete user',
                    error: 'Error message here'
                }
            }
        })
    );
}
