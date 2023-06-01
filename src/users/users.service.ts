import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Attendee } from './entities/attendee.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repositoryUsers: Repository<User>,

    @InjectRepository(Attendee)
    private repositoryAttendee: Repository<Attendee>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.when = Date();
    return await this.repositoryUsers.save(createUserDto);
  }

  async findAll() {
    return await this.repositoryUsers.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.repositoryUsers.findOne({
      where: {id: id},
      relations: ['attendees'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.repositoryUsers.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.repositoryUsers.remove(user);
  }

  async findSearch(keyword: string) {
    const search: string = `%${keyword}%`;
    return await this.repositoryUsers.find({where: {lastName: Like(search)}});
  }

  async pagination(current_page: number, limit: number) {
    const offset = (current_page - 1) * limit;
    const total_page = Math.ceil(await this.repositoryUsers.count() / limit);
    const data = await this.repositoryUsers.find({skip: offset, take: limit});
    return {offset, limit, current_page, total_page, data};
  }

  async parctice(id: string, name: string): Promise<Attendee> {
    const user = await this.repositoryUsers.findOne({ where: { id: id } });
    const attendee = new Attendee();
    attendee.name = name;
    attendee.user = user;
    return await this.repositoryAttendee.save(attendee);
  }
}
