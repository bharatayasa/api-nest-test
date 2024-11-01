import { ApiProperty } from '@nestjs/swagger';

export class NewsDTO {
    @ApiProperty({ example: 'example title' })
    title      : string;

    @ApiProperty({ example: 'example content' })
    content    : string;

    @ApiProperty({ example: 1 })
    categoryId : number;
}
