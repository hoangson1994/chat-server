import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../shared/dtos/RegisterDto';
import { MyValidationPipe } from '../../shared/pipes/validation.pipe';
import { AccountResDto } from '../../shared/res-dto/account-res-dto';
import { Account } from '../../shared/entities/account.entity';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from './jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('register')
  async register(@Body(new MyValidationPipe({transform: true})) registerDto: RegisterDto) {
    if (await this.authService.findAccountByPhone(registerDto.phone)) {
      throw new BadRequestException('phone existed');
    }
    const account = await this.authService.create(registerDto);

    return await this.getAccountReturnData(account);
  }

  @Post('login')
  async login(@Body(new MyValidationPipe({transform: true})) registerDto: RegisterDto) {
    const account = await this.authService.findAccountByPhone(registerDto.phone);
    if (!account) {
      throw new BadRequestException('phone or password invalid');
    }
    if (!(await bcrypt.compare(registerDto.password, account.password))) {
      throw new BadRequestException('invalid password');
    }
    return await this.getAccountReturnData(account);
  }

  @Get('user-data')
  @UseGuards(JwtAuthGuard)
  async userData(@Req() req) {
    const token = req.headers.authorization.replace('Bearer', '');
    return new AccountResDto(req.user, token);
  }

  private async getAccountReturnData(account: Account) {
    const accessToken = await this.authService.fromAccount(account);
    return new AccountResDto(account, accessToken);
  }
}
