import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    
    //TODO : Realizar el hash de la contraseña
    const passwordHash = createUserDto.password;

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash,
        fullName: createUserDto.fullName,
      },
    });

    
    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
