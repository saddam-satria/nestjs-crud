import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IErrorResponse, IResponse } from 'src/app/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserEntity } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {}
  public responseHandler<T>(msg: string, data: T, errors: null | IErrorResponse): IResponse {
    return {
      msg,
      data,
      errors,
    };
  }
  public getRequestData(req: Request): IUserEntity | null {
    const { name, age, country } = req.body;
    if (!name || !age || !country) return null;
    return {
      name,
      age,
      country,
    };
  }
  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
  public async findByID(id: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ id });
    if (!user) return null;

    return user;
  }
  public async insertAndSave(data: IUserEntity) {
    return await this.userRepo.insert(data);
  }
  public async update(id: string, data: IUserEntity) {
    return await this.userRepo.update(
      {
        id,
      },
      data
    );
  }
  public async delete(id: string) {
    return await this.userRepo.delete({ id });
  }
}
