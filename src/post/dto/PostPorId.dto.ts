export class PostPorIdDTO {
	constructor(
		readonly id: string,
		readonly autor: string,
		readonly titulo: string,
		readonly conteudo: string,
		readonly createdAt: string,
		readonly updatedAt: string
	) {}
}