import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(query: Query): Promise<any> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const products = await this.productModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const totalProducts = await this.productModel.countDocuments({
      ...keyword,
    });
    const totalPages = Math.ceil(totalProducts / resPerPage);

    return {
      products,
      currentPage,
      totalPages,
    };
  }

  async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const product = new this.productModel(createProductDto);
    product.seller = user.name;

    const res = await product.save();
    return res;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update the product properties
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }
    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }
    if (updateProductDto.category) {
      product.category = updateProductDto.category;
    }
    if (updateProductDto.rating) {
      product.rating = updateProductDto.rating;
    }

    // Save the updated product
    await product.save();

    return product;
  }

  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
//</boltArtifact>
