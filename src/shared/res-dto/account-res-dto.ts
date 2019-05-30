import { Schema } from 'mongoose';
import { Account } from '../entities/account.entity';
import { parse, format} from 'date-fns';
import { CLIENT_DATE_FORMAT } from '../resources/constants.resource';
export class AccountResDto {
  //tslint:disable
  _id: Schema.Types.ObjectId;
  phone: string;
  accessToken: string;
  createdAt: number;
  createdAtStr: string;
  updatedAt: number;
  updatedAtStr: string;
  status: number;

  constructor(account: Account, accessToken: string) {
    this._id = account._id;
    this.phone = account.phone;
    this.accessToken = accessToken;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
    this.status = account.status;
    this.createdAtStr = format(parse(account.createdAt), CLIENT_DATE_FORMAT);
    this.updatedAtStr = format(parse(account.updatedAt), CLIENT_DATE_FORMAT);
  }
}
