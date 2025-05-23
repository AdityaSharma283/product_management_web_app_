import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  category: string;

  @Prop({ default: 1 })
  rating: number;

  @Prop()
  seller: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
