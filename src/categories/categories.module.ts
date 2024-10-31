import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    CategoriesService, 
    AuthService, 
    JwtService
  ],
  controllers: [CategoriesController], 
  imports: [PrismaModule]
})
export class CategoriesModule {}
