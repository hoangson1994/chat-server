import { prop, Typegoose } from 'typegoose';
import { IsString } from 'class-validator';
import { Schema } from 'mongoose';

export enum AccountStatus {
  active = 1,
  inactive = -1,
}
export class Account extends Typegoose {

  //tslint:disable
  _id: Schema.Types.ObjectId;

  @IsString()
  @prop({required: true, unique: true})
  phone: string;

  @IsString()
  @prop({required: true})
  password: string;

  @prop({required: true, default: Date.now})
  createdAt: number;

  @prop({required: true, default: Date.now})
  updatedAt: number;

  @prop({required: true, default: AccountStatus.active})
  status: number;

}
