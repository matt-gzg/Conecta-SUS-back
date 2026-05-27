import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddInternIdToRecords1768599616571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('records',
            new TableColumn({
                name: 'intern_id',
                type: 'uuid',
            })
        );
        await queryRunner.createForeignKey('records',
            new TableForeignKey({
                name: 'RecordIntern',
                columnNames: ['intern_id'],
                referencedTableName: 'interns',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('record', 'RecordIntern');
        await queryRunner.dropColumn('record', 'patient_id');
    }

}
