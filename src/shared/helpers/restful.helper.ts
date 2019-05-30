import { Inject } from '@nestjs/common';

export class Restful {

  MULTI_DATA = 10;
  SINGLE_DATA = 12;

  constructor(
    private response: Response,
  ) {}
  successResponse(data: any, dataType = this.SINGLE_DATA, meta = null) {
    const result = {
      status: 1,
      message: 'Thành công',
    };

    //tslint:disable
    switch (dataType) {
      case this.SINGLE_DATA:
      default:
        result['data'] = data;
        break;
      case this.MULTI_DATA:
        result['datas'] = data;
        result['meta'] = meta;
        break;
    }
  }
}
