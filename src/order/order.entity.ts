import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => Book)
  book: Book;
}
