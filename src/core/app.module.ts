import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../app/modules/user/user.entity';
import { UserModule } from '../app/modules/user/user.module';
import { DB_URL } from '../app/utils/constants';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
