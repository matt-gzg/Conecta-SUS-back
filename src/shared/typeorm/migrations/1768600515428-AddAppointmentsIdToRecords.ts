import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddAppointmentsIdToRecords1768600515428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('records',
            new TableColumn({
                name: 'appointment_id',
                type: 'uuid',
            })
        );
        await queryRunner.createForeignKey('records',
            new TableForeignKey({
                name: 'AppointmentRecord',
                columnNames: ['appointment_id'],
                referencedTableName: 'appointments',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('record', 'AppointmentRecord');
        await queryRunner.dropColumn('record', 'appointment_id');
    }

}
