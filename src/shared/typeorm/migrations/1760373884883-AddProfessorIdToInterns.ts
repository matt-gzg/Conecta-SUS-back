import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddProfessorIdToInterns1760373884883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('interns',
            new TableColumn({
                name: 'professor_id',
                type: 'uuid',
                isNullable: true
            })
        );
        await queryRunner.createForeignKey('interns',
            new TableForeignKey({
                name: 'InternsProfessor',
                columnNames: ['professor_id'],
                referencedTableName: 'professors',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('interns', 'InternsProfessor');
        await queryRunner.dropColumn('interns', 'professor_id');
    }

}