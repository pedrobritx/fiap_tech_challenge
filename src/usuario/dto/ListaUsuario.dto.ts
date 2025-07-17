export class ListaUsuarioDTO {
	constructor(
		readonly id: string,
		readonly nome: string,
		readonly email: string,
		readonly createdAt: string,
		readonly updatedAt: string
	) {}
}