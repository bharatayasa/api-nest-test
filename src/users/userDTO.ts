import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({ example: 'johndoe' })
    username : string;

    @ApiProperty({ example: 'John Doe'})
    name     : string;
    
    @ApiProperty({ example: 'hahah@ss.cc' })
    email    : string;
    
    @ApiProperty({ example: '123' })
    password : string;
    
    @ApiProperty({ example: 'user' })
    role?    : Role;
}
