import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Account } from '../../shared/entities/account.entity';
import { ModelType } from 'typegoose';
import { RegisterDto } from '../../shared/dtos/RegisterDto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account) private readonly account: ModelType<Account>,
    private readonly jwtService: JwtService,
  ) {
  }

  async fromAccount(account: Account) {
    const payload: JwtPayload = { id: String(account._id) };
    return this.jwtService.sign(payload);
  }

  async toAccount(token: string): Promise<any> {
    const payload: JwtPayload = jwt.decode(token) as JwtPayload;
    return await this.findAccountByPayLoad(payload);
  }

  async create(registerDto: RegisterDto): Promise<Account> {
    registerDto.password = bcrypt.hashSync(registerDto.password, 2);
    const createdAccount = new this.account(registerDto);
    return await createdAccount.save();
  }

  async findAccountByPayLoad(payload: JwtPayload) {
    return await this.account.findById(payload.id).exec();
  }

  async findAccountByPhone(phone: string) {
    return await this.account.findOne({phone}).exec();
  }
}
