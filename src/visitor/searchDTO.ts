import { ApiProperty } from '@nestjs/swagger';

export class SearchNewsDTO {
    @ApiProperty({ example: 'Sport' })
    keyword: string;
}