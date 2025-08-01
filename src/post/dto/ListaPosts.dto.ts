import { BaseResponseDto } from '../../common/dto/base-response.dto';

export class ListPostsDTO extends BaseResponseDto {
	readonly autor: string;
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