import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  providers: [
    NewsService, 
    AuthService, 
    PrismaService, 
    JwtService
  ],
  controllers: [NewsController], 
})
export class NewsModule {}
