import { HttpException, HttpStatus, Injectable,Dependencies } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import {ProductDto} from './dto/product.dto';
import {CreateProductDto} from './dto/create.product.dto';


@Injectable()
@Dependencies(InjectRepository(ProductEntity))
export class ProductService {

    constructor(
        //@InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
      ) {}


    async find(options?: object): Promise<ProductDto[]> {
    const products = await this.productRepo.find(options);
    return products;
  }

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepo.find();
    return products;
  }

    
  async create(productDto: CreateProductDto): Promise<ProductDto> {
    const { name, description, make } = productDto;

    // check if the user exists in the db
    const userInDb = await this.productRepo.findOne({ where: { name } });
    if (userInDb) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    const product: ProductEntity = await this.productRepo.create({
      name,
      description,
      make
    });

    await this.productRepo.save(product);

    return product;
  }
}
