import { Module,DynamicModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ProductModule } from './product/product.module';
import { CartService } from './cart/cart.service';
import { ProductService } from './product/product.service';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import {UsersModule} from './user/user.module';



@Module({ })
export class AppModule {
  
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        AuthModule,
        UsersModule,
        ProductModule,
        CartModule,
        TypeOrmModule.forRootAsync(connOptions),
      ],
  providers: [AppService, ProductService, CartService],
    }
  }

}
