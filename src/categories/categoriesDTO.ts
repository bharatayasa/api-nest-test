import { ApiProperty } from '@nestjs/swagger';

export class CategoriesDTO {
    @ApiProperty({ example: 'example' })
    name     : string;
}
