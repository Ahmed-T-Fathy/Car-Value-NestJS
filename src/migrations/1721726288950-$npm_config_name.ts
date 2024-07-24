import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721726288950 implements MigrationInterface {
    name = ' $npmConfigName1721726288950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

}
