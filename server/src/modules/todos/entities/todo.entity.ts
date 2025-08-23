import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  is_completed: boolean;

  @Column()
  priority: number;

  @Column()
  status: string;
}
