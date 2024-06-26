import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookModule } from "./book/book.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [AuthModule, UserModule, BookModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
