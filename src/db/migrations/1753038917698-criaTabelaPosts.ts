import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaPosts1753038917698 implements MigrationInterface {
    name = 'CriaTabelaPosts1753038917698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" (
			"id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
			"titulo" character varying(100) NOT NULL, 
			"conteudo" text NOT NULL, 
			"created_at" TIMESTAMP NOT NULL DEFAULT now(), 
			"updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
			"usuarioId" uuid, 
			CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
		)`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c9d8a1e413142a85d24fe8956ac" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c9d8a1e413142a85d24fe8956ac"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
