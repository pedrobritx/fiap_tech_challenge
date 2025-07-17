export class BuscaUsuarioPorEmailDTO {
	constructor(
		readonly id: string,
		readonly nome: string,
		readonly email: string,
		readonly senha: string
	){}
}