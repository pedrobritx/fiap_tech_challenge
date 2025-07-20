import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeiraMigration1753019543007 implements MigrationInterface {
    name = 'PrimeiraMigration1753019543007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" (
			"id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
			"nome" character varying(100) NOT NULL, 
			"senha" character varying(60) NOT NULL, 
			"email" character varying(70) NOT NULL, 
			"created_at" TIMESTAMP NOT NULL DEFAULT now(), 
			"updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
			CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), 
			CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
		)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
