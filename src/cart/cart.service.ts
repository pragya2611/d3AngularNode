
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../user/user.service';
import {ProductAddedStatus} from './interfaces/product.added';
import {CartInterface} from './interfaces/cart.dto';
import {CartCreationInterface} from './interfaces/cart.create.dto';
import {AddToCart} from './interfaces/add.to.cart';
import { identity } from 'rxjs';



@Injectable()
export class CartService {
    constructor( @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
    private readonly productRepo: Repository<ProductEntity>,
    //private readonly userRepo: Repository<UserEntity>,
    private readonly userService : UsersService,
    ) {
       
    }
    

        // async find(options?: object): Promise<ProductDto[]> {
        //     const products = await this.productRepo.find(options);
        //     return products;
        //   }
        
        async findCart(userId): Promise<CartInterface> {
            const userInDb = await this.userService.findById(userId);
            
            const cartWithItems = await this.cartRepo.findOne(userInDb.cart);

            return cartWithItems;
          }
        
        async createCart() : Promise<CartEntity> {
              const newCart = await this.cartRepo.create();

              return newCart;
        }
            
          async addProductToCart(args : AddToCart): Promise<ProductAddedStatus> {
            const {cartId , productIds  } = args;
            //check if product exists in db 
          
            const productsInDb = await this.productRepo.findByIds(productIds);
            if (productsInDb) {
            
            
            const cart = await this.cartRepo.findOne(cartId);
            cart.products = productsInDb;
             const result = await this.cartRepo.update(cartId,cart);

             if(result) {
               return {
                 success : true,
                 message : 'Cart updated succesfully'
               };
             } 

            }
          }
        
        
}

