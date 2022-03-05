import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class App {
  private port: number = 5000;
  async start() {
    const app = await NestFactory.create(AppModule);

    await app.listen(this.port);
  }
}
