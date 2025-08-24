import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTodoTable1756035146728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'is_completed',
            type: 'boolean',
          },
          {
            name: 'priority',
            type: 'int',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo');
  }
}
