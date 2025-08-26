import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1756227036118 implements MigrationInterface {
  name = 'CreateUsers1756227036118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4" ON "user" ("updatedAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92f09bd6964a57bb87891a2acf" ON "user" ("deletedAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_92f09bd6964a57bb87891a2acf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_80ca6e6ef65fb9ef34ea8c90f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
