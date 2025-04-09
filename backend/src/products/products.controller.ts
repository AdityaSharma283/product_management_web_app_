import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/auth/schemas/user.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query() query: ExpressQuery): Promise<any> {
    return this.productsService.findAll(query);
  }

  @Post()
  async createProduct(
    @Body() product: CreateProductDto,
    @Req() req: Request,
  ): Promise<any> {
    const user = req.user as User;
    return this.productsService.createProduct(product, user);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.findById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.deleteById(id);
  }
}