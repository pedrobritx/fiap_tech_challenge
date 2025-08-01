import { IsNotEmpty, MaxLength, MinLength, IsOptional } from "class-validator";

export class EditaPostDTO {

	@IsOptional()
	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MinLength(3, {message: 'O título deve ter pelo menos 3 caracteres'})
	@MaxLength(100, {message: 'O título não pode ter mais de 100 caracteres'})
	titulo?: string;

	@IsOptional()
	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	@MinLength(10, {message: 'O conteúdo deve ter pelo menos 10 caracteres'})
	@MaxLength(5000, {message: 'O conteúdo não pode ter mais de 5000 caracteres'})
	conteudo?: string;

}