import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddInternIdToAppointments1768582713222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments',
            new TableColumn({
                name: 'intern_id',
                type: 'uuid',
            })
        );
        await queryRunner.createForeignKey('appointments',
            new TableForeignKey({
                name: 'AppointmentIntern',
                columnNames: ['intern_id'],
                referencedTableName: 'interns',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentIntern');
        await queryRunner.dropColumn('appointments', 'intern_id');
    }

}
