export class ListPostsDTO {
	constructor(
		readonly id: string,
		readonly autor: string,
		readonly titulo: string,
		readonly createdAt: string,
		readonly updatedAt: string
	) {}
}