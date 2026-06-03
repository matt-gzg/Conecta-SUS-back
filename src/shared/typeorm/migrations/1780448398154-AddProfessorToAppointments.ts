import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddProfessorToAppointments1780448398154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "appointments",
            new TableColumn({
                name: "professor_id",
                type: "uuid",
                isNullable: true, 
            })
        );

        await queryRunner.createForeignKey(
            "appointments",
            new TableForeignKey({
                name: "AppointmentProfessorFK",
                columnNames: ["professor_id"],
                referencedTableName: "professors", 
                referencedColumnNames: ["id"],
                onDelete: "SET NULL", 
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("appointments", "AppointmentProfessorFK");
        await queryRunner.dropColumn("appointments", "professor_id");
    }
}