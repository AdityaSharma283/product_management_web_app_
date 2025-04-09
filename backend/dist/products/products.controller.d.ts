import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Request } from 'express';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllProducts(query: ExpressQuery): Promise<any>;
    createProduct(product: CreateProductDto, req: Request): Promise<any>;
    getProduct(id: string): Promise<any>;
    updateProduct(id: string, product: UpdateProductDto): Promise<any>;
    deleteProduct(id: string): Promise<any>;
}
