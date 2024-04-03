import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { User } from "src/user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Book } from "src/book/book.entity";

@Injectable()
export class OrderService {
  constructor(
    @Inject("ORDER_REPOSITORY")
    private readonly orderRepository: Repository<Order>,
    private readonly jwtService: JwtService
  ) {}

  async find(token: string): Promise<Order[]> {
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.sub;

    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "book"],
    });
  }

  async addOrder(id: number, token: string): Promise<Order> {
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.sub;

    const order = new Order();
    const user = await this.orderRepository.manager.findOneOrFail(User, {
      where: { id: userId },
    });
    const book = await this.orderRepository.manager.findOneOrFail(Book, {
      where: { id },
    });
    user.point = user.point - book.point;
    this.orderRepository.manager.save(User, user);

    order.user = user;
    order.book = book;

    return await this.orderRepository.save(order);
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["user", "book"],
    });
    const user = order.user;
    user.point = user.point + order.book.point;
    this.orderRepository.manager.save(User, user);
    await this.orderRepository.delete(id);
  }
}
