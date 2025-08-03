import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListPostsDTO extends BaseResponseDto {
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

	constructor(
		id: string,
		autor: string,
		titulo: string,
		createdAt: Date,
		updatedAt: Date
	) {
		super(id, createdAt, updatedAt);
		this.autor = autor;
		this.titulo = titulo;
	}
}