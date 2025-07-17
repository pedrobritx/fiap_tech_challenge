import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from 'typeorm';

@Entity({name: 'usuarios'})
export class UsuarioEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'nome', length: 100, nullable: false})
	nome: string;

	@Column({name: 'senha', length: 50, nullable: false})
	senha: string;

	@Column({name: 'email', length: 70, nullable: false, unique: true})
	email: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: string;

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: string;
}