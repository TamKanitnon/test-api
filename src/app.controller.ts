import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/test')
export class AppController {
  private readonly appService: AppService;
  
  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get('/connection')
  getHello(): string {
    return this.appService.getHello();
  }
}
