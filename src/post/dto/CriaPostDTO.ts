import { IsNotEmpty, MaxLength, MinLength, IsUUID } from "class-validator";

export class CriaPostDTO {

	@IsNotEmpty({message: 'O ID do usuário não pode estar vazio'})
	@IsUUID(4, {message: 'ID do usuário deve ser um UUID válido'})
	usuarioId: string;

	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MinLength(3, {message: 'O título deve ter pelo menos 3 caracteres'})
	@MaxLength(100, {message: 'O título não pode ter mais de 100 caracteres'})
	titulo: string;

	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	@MinLength(10, {message: 'O conteúdo deve ter pelo menos 10 caracteres'})
	@MaxLength(5000, {message: 'O conteúdo não pode ter mais de 5000 caracteres'})
	conteudo: string;

}