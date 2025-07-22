import { IsNotEmpty, MaxLength } from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class CriaPostDTO {

	@IsNotEmpty({message: 'O autor não pode estar vazio'})
	usuario: UsuarioEntity;

	@IsNotEmpty({message: 'O título não pode estar vazio'})
	@MaxLength(100,{message: 'O título não pode ter mais de 100 caracteres'})
	titulo: string;

	@IsNotEmpty({message: 'O conteúdo não pode estar vazio'})
	conteudo: string;

}