import { Injectable, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("auth/account-not-found");
    }
    delete user.password;
    return user;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new BadRequestException("auth/account-exists");
    }
    const user: User = await this.userService.create(name, email, password);
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      sub: user.id,
      point: user.point,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
