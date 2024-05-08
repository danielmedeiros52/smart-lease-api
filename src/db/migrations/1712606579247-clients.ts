import { MigrationInterface, QueryRunner } from "typeorm";

export class Clients1712606579247 implements MigrationInterface {
    name = 'Clients1712606579247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bo_id" character varying NOT NULL, "name" character varying(100) NOT NULL, "alias_name" character varying(244), "document" character varying(20), "payment_exchange_fee" character varying(20), "payout_exchange_fee" character varying(20), "payment_ecommerce" character varying(20), "payment_company" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c8e472dd9d969b7a213bdc702e" PRIMARY KEY ("id", "bo_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
