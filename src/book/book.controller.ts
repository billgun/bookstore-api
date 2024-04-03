import { Controller, Req, Get } from "@nestjs/common";
import { Request } from "express";
import { BookService } from "./book.service";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Req() req: Request) {
    return this.bookService.findAll();
  }
}
