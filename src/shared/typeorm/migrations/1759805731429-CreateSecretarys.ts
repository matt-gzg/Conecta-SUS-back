import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSecretarys1759805731429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
            new Table({
                name: 'secretarys',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'email', type: 'varchar', isUnique: true},
                    {name: 'name', type: 'varchar'},
                    {name: 'password', type: 'varchar'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'},
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('secretarys');
    }

}
