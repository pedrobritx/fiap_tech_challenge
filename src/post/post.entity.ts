import { UsuarioEntity } from "../usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'posts'})
export class PostEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'titulo', length: 100, nullable: false})
	titulo: string;

	@Column({name: 'conteudo', type: 'text', nullable: false})
	conteudo: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: string;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: string;

	@ManyToOne(() => UsuarioEntity,(usuario) => usuario.posts)
	usuario: UsuarioEntity
}
