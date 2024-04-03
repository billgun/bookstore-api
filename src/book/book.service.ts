import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Book } from "./book.entity";

@Injectable()
export class BookService {
  constructor(
    @Inject("BOOK_REPOSITORY")
    private readonly bookRepository: Repository<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }
}
