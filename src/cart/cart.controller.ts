
import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
    UsePipes,
    Get,
    Req,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import {CartService} from '../cart/cart.service';
  import {JwtAuthGuard} from '../auth/jwt.auth.guard';
  import {CartInterface} from './interfaces/cart.dto';
  import {AddToCart} from './interfaces/add.to.cart';
  import {ProductAddedStatus} from './interfaces/product.added';

@Controller('cart')
export class CartController {


    constructor(private readonly cartService : CartService) {}

    @UseGuards(JwtAuthGuard)
    @Get('find')
    public async find(userId : number
     
    ): Promise<CartInterface> {
      const result: CartInterface  = await this.cartService.findCart(
        userId,
      );
  
      if (!result.id) {
        throw new HttpException('Error in creating a new product', HttpStatus.BAD_REQUEST);
      }
  
      return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post('addToCart')
    public async addProductToCart(
        @Body() addToCart: AddToCart,
    ): Promise<ProductAddedStatus> {
       
      const result: ProductAddedStatus  = await this.cartService.addProductToCart(addToCart);


      if (!result) {
        throw new HttpException('Cart is empty', HttpStatus.BAD_REQUEST);
      }
  
      return result;
    }

    
}




