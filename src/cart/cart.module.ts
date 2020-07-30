import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import {CartService} from './cart.service';
import {CartEntity} from './cart.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
