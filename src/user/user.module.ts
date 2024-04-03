import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [...userProviders, UserService],
  exports: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
