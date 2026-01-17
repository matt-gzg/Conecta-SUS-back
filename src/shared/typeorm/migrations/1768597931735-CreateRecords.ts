import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecords1768597931735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'records',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                    { name: 'anamnesis', type: 'text' },
                    { name: 'physicalExam', type: 'text' },
                    { name: 'solicitedTests', type: 'text' },
                    { name: 'instructions', type: 'text' },
                    { name: 'prescription', type: 'text' },
                    { name: 'conduct', type: 'text' },
                    { name: 'cid10', type: 'varchar' },
                    { name: 'aproved', type: 'boolean', default: false , isNullable: true},
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('records');
    }

}
