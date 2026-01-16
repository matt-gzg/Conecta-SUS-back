import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddPatientIdToAppointments1768582488236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments',
            new TableColumn({
                name: 'patient_id',
                type: 'uuid',
            })
        );
        await queryRunner.createForeignKey('appointments',
            new TableForeignKey({
                name: 'AppointmentPatient',
                columnNames: ['patient_id'],
                referencedTableName: 'patients',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentPatient');
        await queryRunner.dropColumn('appointments', 'patient_id');
    }

}
