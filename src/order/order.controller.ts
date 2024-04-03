import { Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderService } from "./order.service";
import { Request } from "express";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("")
  getProfile(@Req() req: Request) {
    const token = req.headers.authorization.replace("Bearer ", "");

    return this.orderService.find(token);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/:id")
  addOrder(@Req() req: Request) {
    const token = req.headers.authorization.replace("Bearer ", "");

    return this.orderService.addOrder(
      req.params.id as unknown as number,
      token
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  delete(@Req() req: Request) {
    return this.orderService.delete(req.params.id as unknown as number);
  }
}
