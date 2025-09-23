import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health() {
    // JSON health check endpoint
    return { status: 'API is running', message: this.appService.getHello() };
  }
}
