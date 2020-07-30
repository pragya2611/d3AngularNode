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
  import {ProductDto} from './dto/product.dto';
  import {CreateProductDto} from './dto/create.product.dto';
  import {ProductService} from './product.service';
  import {ProductCreationStatus} from '../product/interfaces/product.creation.status';
  import {JwtAuthGuard} from '../auth/jwt.auth.guard';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    public async register(
      @Body() CreateProductDto: CreateProductDto,
    ): Promise<ProductDto> {
      const result: ProductDto  = await this.productService.create(
        CreateProductDto,
      );
  
      if (!result.id) {
        throw new HttpException('Error in creating a new product', HttpStatus.BAD_REQUEST);
      }
  
      return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    public async listAllProducts(
     
    ): Promise<ProductDto[]> {
      const result: ProductDto[]  = await this.productService.findAll();


      if (result.length == 0) {
        throw new HttpException('No products to show', HttpStatus.BAD_REQUEST);
      }
  
      return result;
    }

    
}
