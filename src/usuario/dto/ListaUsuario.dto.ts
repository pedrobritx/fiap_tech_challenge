export class ListaUsuarioDTO {
	constructor(
		readonly id: string,
		readonly nome: string,
		readonly email: string,
		readonly createdAt: Date,
		readonly updatedAt: Date
	) {}
}