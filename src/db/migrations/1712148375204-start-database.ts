import { MigrationInterface, QueryRunner } from "typeorm";

export class StartDatabase1712148375204 implements MigrationInterface {
    name = 'StartDatabase1712148375204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bo_uid" character varying NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "title" character varying(30) NOT NULL, "phone" character varying(30) NOT NULL, "country" character varying(20) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
