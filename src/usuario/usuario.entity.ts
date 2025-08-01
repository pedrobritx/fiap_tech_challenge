
import { PostEntity } from '../post/post.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity({name: 'usuarios'})
export class UsuarioEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'nome', length: 100, nullable: false})
	nome: string;

	@Column({name: 'senha', length: 60, nullable: false})
	senha: string;

	@Column({name: 'email', length: 70, nullable: false, unique: true})
	email: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: Date;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: Date;

	@OneToMany(() => PostEntity, (post) => post.usuario)
	posts: PostEntity[]
}