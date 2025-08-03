import { IsNotEmpty, MaxLength, MinLength, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class EditaPostDTO {

	@ApiPropertyOptional({ 
		description: 'Novo título do post',
		example: 'Matemática Avançada - Atualizado',
		minLength: 3,
		maxLength: 100
	})
	@IsOptional()
	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MinLength(3, {message: 'O título deve ter pelo menos 3 caracteres'})
	@MaxLength(100, {message: 'O título não pode ter mais de 100 caracteres'})
	titulo?: string;

	@ApiPropertyOptional({ 
		description: 'Novo conteúdo do post',
		example: 'Conteúdo atualizado da aula com novos exercícios e exemplos práticos...',
		minLength: 10,
		maxLength: 5000
	})
	@IsOptional()
	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	@MinLength(10, {message: 'O conteúdo deve ter pelo menos 10 caracteres'})
	@MaxLength(5000, {message: 'O conteúdo não pode ter mais de 5000 caracteres'})
	conteudo?: string;

}