import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUser() {
    const message = 'get all user data';
    try {
      const users = await this.userService.findAll();
      return this.userService.responseHandler<UserEntity[]>(message, users, null);
    } catch (error) {
      return this.userService.responseHandler<null>(message, null, {
        message: error.message,
      });
    }
  }
  @Post()
  async addUser(@Req() req: Request) {
    const newUser = this.userService.getRequestData(req);
    const message = 'insert User';
    if (newUser === null)
      return this.userService.responseHandler<null>(message, null, {
        message: 'JSON body needed',
      });
    try {
      const user = await this.userService.insertAndSave(newUser);

      console.log(user);

      // const data = this.userService.getRequestData(req);
      return this.userService.responseHandler<string>(message, 'Success Insert', null);
    } catch (error) {
      return this.userService.responseHandler<null>(message, null, {
        message: error.message,
      });
    }
  }
  @Get(':id')
  async getUserByID(@Param('id') id: string) {
    try {
      const user = await this.userService.findByID(id);

      if (user === null) throw new Error('User Not Found');
      return this.userService.responseHandler<UserEntity | null>('get user by id', user, null);
    } catch (error) {
      return this.userService.responseHandler<null>('get user by id', null, {
        message: error.message,
      });
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    try {
      const newUser = this.userService.getRequestData(req);
      if (newUser === null) throw new Error('JSON body needed ');

      const updatedUser = await this.userService.update(id, newUser);

      if (updatedUser.affected === 0) throw new Error('User Not Found');
      return this.userService.responseHandler<string>('update user by id', 'Success Update User', null);
    } catch (error) {
      return this.userService.responseHandler<null>('update user by id', null, {
        message: error.message,
      });
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.delete(id);

      if (deletedUser.affected === 0) throw new Error('User Not Found');
      return this.userService.responseHandler<string>('delete user', 'delete user success', null);
    } catch (error) {
      return this.userService.responseHandler<null>('delete user', null, {
        message: error.message,
      });
    }
  }
}
