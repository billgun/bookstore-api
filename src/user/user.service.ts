import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findLoggedInUser(token: string): Promise<User> {
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.sub;

    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password);
    return await this.userRepository.save(user);
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }
}
