import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      message: 'DevTool Backend is running',
      timestamp: new Date().toISOString(),
    };
  }
}
