import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDocumenteToRecords1779710755489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('records',
            new TableColumn({
                name: 'document',
                type: 'varchar',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('records', 'document');
    }

}
