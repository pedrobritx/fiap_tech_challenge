import { BaseResponseDto } from '../../common/dto/base-response.dto';

export class PostPorIdDTO extends BaseResponseDto {
	readonly autor: string;
	readonly titulo: string;
	readonly conteudo: string;

	constructor(
		id: string,
		autor: string,
		titulo: string,
		conteudo: string,
		createdAt: Date,
		updatedAt: Date
	) {
		super(id, createdAt, updatedAt);
		this.autor = autor;
		this.titulo = titulo;
		this.conteudo = conteudo;
	}
}