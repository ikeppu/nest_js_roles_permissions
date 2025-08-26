import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionTitle1756230730230 implements MigrationInterface {
    name = 'PermissionTitle1756230730230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "title"`);
    }

}
