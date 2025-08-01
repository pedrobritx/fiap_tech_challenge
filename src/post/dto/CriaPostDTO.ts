import { IsNotEmpty, MaxLength, MinLength, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriaPostDTO {

	@ApiProperty({ 
		description: 'ID do usuário autor do post',
		example: '123e4567-e89b-12d3-a456-426614174000',
		format: 'uuid'
	})
	@IsNotEmpty({message: 'O ID do usuário não pode estar vazio'})
	@IsUUID(4, {message: 'ID do usuário deve ser um UUID válido'})
	usuarioId: string;

	@ApiProperty({ 
		description: 'Título do post',
		example: 'Introdução à Matemática Básica',
		minLength: 3,
		maxLength: 100
	})
	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MinLength(3, {message: 'O título deve ter pelo menos 3 caracteres'})
	@MaxLength(100, {message: 'O título não pode ter mais de 100 caracteres'})
	titulo: string;

	@ApiProperty({ 
		description: 'Conteúdo completo do post',
		example: 'Nesta aula vamos aprender os conceitos fundamentais da matemática, incluindo operações básicas, frações e números decimais...',
		minLength: 10,
		maxLength: 5000
	})
	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	@MinLength(10, {message: 'O conteúdo deve ter pelo menos 10 caracteres'})
	@MaxLength(5000, {message: 'O conteúdo não pode ter mais de 5000 caracteres'})
	conteudo: string;

}