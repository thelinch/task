import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class cicleAcademicMigration1562513582439 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "cicleAcademic",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                }, {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
