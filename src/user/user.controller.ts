import { Controller, Req, Get, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("")
  getProfile(@Req() req: Request) {
    const token = req.headers.authorization.replace("Bearer ", "");

    return this.userService.findLoggedInUser(token);
  }
}
