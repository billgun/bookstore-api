import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  writer: string;

  @Column({ length: 500, name: "image_url" })
  imageUrl: string;

  @Column()
  point: number;

  @Column("text", { array: true })
  tag: string[];
}
