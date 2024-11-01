import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthDTO } from './authDTO';

export function RegisterSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Register new user' }),
        ApiBody({
            type: AuthDTO,
            description: 'User registration details',
            schema: {
                example: {
                    username: 'newuser',
                    name: 'New User',
                    email: 'newuser@example.com',
                    password: 'password123'
                }
            },
        }),
        ApiResponse({
            status: 201,
            description: 'User registered successfully',
            schema: {
                example: {
                    message: 'User registered successfully',
                    data: {
                        username: 'newuser',
                        name: 'New User',
                        role: 'User',
                        createdAt: '2024-01-01'
                    }
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Failed to register user',
            schema: {
                example: {
                    message: 'Failed to register user',
                    error: 'Error message here',
                },
            },
        })
    );
}

export function LoginSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'User login' }),
        ApiBody({
            type: AuthDTO,
            description: 'User login credentials',
            schema: {
                example: {
                    email: 'johndoe@example.com',
                    password: 'password123'
                }
            }
        }),
        ApiResponse({
            status: 200,
            description: 'Login successful',
            schema: {
                example: {
                    message: 'Login successful',
                    data: {
                        user: {
                            id: 1,
                            username: 'johndoe',
                            name: 'John Doe',
                            email: 'johndoe@example.com',
                            role: 'User'
                        },
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    }
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Login failed',
            schema: {
                example: {
                    message: 'Login failed',
                    error: 'Invalid email or password',
                },
            },
        })
    );
}

export function LogoutSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'User logout' }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Logout successful',
            schema: {
                example: {
                    message: 'Logout success',
                    data: {
                        logoutAt: '2024-10-01'
                    }
                }
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Token is missing',
            schema: {
                example: {
                    message: 'Token is missing'
                }
            }
        }),
        ApiResponse({
            status: 500,
            description: 'Logout failed',
            schema: {
                example: {
                    message: 'Logout failed',
                    error: 'Error message here'
                }
            }
        })
    )
}
