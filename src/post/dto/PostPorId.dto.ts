import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostPorIdDTO extends BaseResponseDto {
	@ApiProperty({ 
		description: 'Nome do autor do post',
		example: 'Prof. Maria Silva'
	})
	readonly autor: string;

	@ApiProperty({ 
		description: 'Título do post',
		example: 'Introdução à Matemática Básica'
	})
	readonly titulo: string;

	@ApiProperty({ 
		description: 'Conteúdo completo do post',
		example: 'Nesta aula vamos aprender os conceitos fundamentais da matemática, incluindo operações básicas, frações e números decimais. O objetivo é proporcionar uma base sólida para estudos mais avançados...'
	})
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