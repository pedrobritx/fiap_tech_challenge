import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class EditaPostDTO {

	@IsOptional()
	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MaxLength(100,{message: 'O título não pode ter mais de 100 caracteres'})
	titulo?: string;

	@IsOptional()
	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	conteudo?: string;

}