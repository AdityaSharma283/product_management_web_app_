"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(query) {
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
            .find(Object.assign({}, keyword))
            .limit(resPerPage)
            .skip(skip)
            .sort({
            createdAt: -1,
        });
        const totalProducts = await this.productModel.countDocuments(Object.assign({}, keyword));
        const totalPages = Math.ceil(totalProducts / resPerPage);
        return {
            products,
            currentPage,
            totalPages,
        };
    }
    async createProduct(createProductDto, user) {
        const product = new this.productModel(createProductDto);
        product.seller = user.name;
        const res = await product.save();
        return res;
    }
    async findById(id) {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return product;
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
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
        await product.save();
        return product;
    }
    async deleteById(id) {
        return await this.productModel.findByIdAndDelete(id);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map