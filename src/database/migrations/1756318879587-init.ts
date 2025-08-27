import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756318879587 implements MigrationInterface {
    name = 'Init1756318879587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, CONSTRAINT "UQ_8dad765629e83229da6feda1c1d" UNIQUE ("code"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "accessTokenHash" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4" ON "user" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_92f09bd6964a57bb87891a2acf" ON "user" ("deletedAt") `);
        await queryRunner.query(`CREATE TABLE "role_permission" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`CREATE TABLE "user_role" ("user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "user_permission" ("user_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_e55fe6295b438912cb42bce1baa" PRIMARY KEY ("user_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2305dfa7330dd7f8e211f4f35d" ON "user_permission" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a4d5521c1ced158c13438df3d" ON "user_permission" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`);
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a4d5521c1ced158c13438df3d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2305dfa7330dd7f8e211f4f35d"`);
        await queryRunner.query(`DROP TABLE "user_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32a6fc2fcb019d8e3a8ace0f55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0e5815877f7395a198a4cb0a4"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92f09bd6964a57bb87891a2acf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80ca6e6ef65fb9ef34ea8c90f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
