import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<Product>);
    findAll(query: Query): Promise<any>;
    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product>;
    findById(id: string): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteById(id: string): Promise<Product>;
}
