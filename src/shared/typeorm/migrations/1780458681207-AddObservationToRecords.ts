import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddObservationToRecords1780458681207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("records", new TableColumn({
            name: "professor_observation",
            type: "text", 
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("records", "professor_observation");
    }
}