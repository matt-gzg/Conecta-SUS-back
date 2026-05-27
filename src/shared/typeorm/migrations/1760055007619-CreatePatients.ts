import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatients1760055007619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'patients',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'name', type: 'varchar' },
                { name: 'cpf', type: 'varchar', isUnique: true },
                { name: 'susnumber', type: 'varchar', isUnique: true },
                { name: 'email', type: 'varchar', isNullable: true, isUnique: true },
                { name: 'birth_date', type: 'date' },
                { name: 'phone', type: 'varchar' },
                { name: 'gender', type: 'varchar' },
                { name: 'cep', type: 'varchar' },
                { name: 'city', type: 'varchar' },
                { name: 'street', type: 'varchar' },
                { name: 'district', type: 'varchar' },
                { name: 'number', type: 'varchar' },
                { name: 'complement', type: 'varchar', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now()' }
            ]
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patients');
    }

}
