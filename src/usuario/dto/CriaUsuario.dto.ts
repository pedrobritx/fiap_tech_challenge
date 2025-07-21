import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CriaUsuarioDTO {

	@IsNotEmpty({message: 'O nome não pode ser vazio'})
	@MaxLength(100,{message: 'O nome deve ter no máximo 100 caracteres'})
	nome: string;

	@IsEmail(undefined, {message: 'O e-mail informado é inválido'})
	@MaxLength(70,{message: 'O e-mail deve ter nom máximo 70 caracteres'})
	email: string;

	@MinLength(6, {message: 'A senha prcisa ter pelo menos 6 caracteres'})
	@MaxLength(50,{message: 'O nome deve ter nom máximo 50 caracteres'})
	senha: string;
}