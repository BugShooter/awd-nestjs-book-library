import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class Book {
    @PrimaryGeneratedColumn('uuid') // 'id' column, UUID type, primary key, auto-generated
    id: string;

    @Column({ length: 255, nullable: false })
    title: string;

    @Column({ length: 255, nullable: false })
    author: string;

    // @Column({ type: 'date', nullable: false })
    // publishedYear: Date;
    @Column({ length: 4, nullable: false })
    publishedYear: string;
}
