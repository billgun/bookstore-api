import { Connection, Repository } from "typeorm";
import { Order } from "./order.entity";

export const orderProviders = [
  {
    provide: "ORDER_REPOSITORY",
    useFactory: (connection) => connection.getRepository(Order),
    inject: ["DATABASE_CONNECTION"],
  },
];
