import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  is_completed: boolean;

  @Column()
  priority: number;

  @Column({ default: 'undone' })
  status: string;
}
