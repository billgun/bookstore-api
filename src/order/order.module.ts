import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { DatabaseModule } from "src/database/database.module";
import { orderProviders } from "./order.providers";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders],
  exports: [OrderService, ...orderProviders],
})
export class OrderModule {}
