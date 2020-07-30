import {ProductDto} from '../../product/dto/product.dto';
export class CartInterface {
    id : String;
    products? : ProductDto[]
}