import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './modules/todos/todos.module';
import { getConfig } from './common/config';
import { Todo } from './modules/todos/entities/todo.entity';

const { host, postgresPort, user, password, database } = getConfig();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port: postgresPort,
      username: user,
      password,
      database,
      entities: [Todo],
      synchronize: false,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
