import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../prisma/prisma.service';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';

@Module({
  providers: [
    VisitorService, 
    AuthService, 
    PrismaService, 
    JwtService
  ],
  controllers: [VisitorController]
})
export class VisitorModule {}
