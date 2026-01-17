import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddPatientIdToRecords1768598667610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('records',
            new TableColumn({
                name: 'patient_id',
                type: 'uuid',
            })
        );
        await queryRunner.createForeignKey('records',
            new TableForeignKey({
                name: 'RecordPatient',
                columnNames: ['patient_id'],
                referencedTableName: 'patients',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('record', 'RecordPatient');
        await queryRunner.dropColumn('record', 'patient_id');
    }

}
