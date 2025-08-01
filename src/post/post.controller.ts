import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { ListPostsDTO } from "./dto/ListaPosts.dto";
import { CriaPostDTO } from "./dto/CriaPostDTO";
import { PostEntity } from "./post.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { PostPorIdDTO } from "./dto/PostPorId.dto";
import { EditaPostDTO } from "./dto/EditaPostDTO";

@Controller('/post')
export class PostController {

	constructor(
		private postService: PostService
	) {}

	@UseGuards(AuthGuard)
	@Post()
	async criaPost(
		@Body() dadosPost: CriaPostDTO
	) {
		const novoPost = new PostEntity();
		novoPost.usuario = dadosPost.usuario;
		novoPost.titulo = dadosPost.titulo;
		novoPost.conteudo = dadosPost.conteudo;

		return await this.postService.criaPost(novoPost)
	}

	@Get()
	async listaPosts() {
		const posts = await this.postService.listarPosts()

		return posts.map(post => new ListPostsDTO(
			post.id,
			post.usuario.nome,
			post.titulo,
			post.createdAt,
			post.updatedAt
		))
	}

	@Get('search')
	async buscaPosts(@Query('q') termo: string) {
		if (termo && termo.trim().length < 2) {
			throw new HttpException(
				'Termo de busca deve ter pelo menos 2 caracteres',
				HttpStatus.BAD_REQUEST
			)
		}

		const posts = await this.postService.buscaPosts(termo)

		return posts.map(post => new ListPostsDTO(
			post.id,
			post.usuario.nome,
			post.titulo,
			post.createdAt,
			post.updatedAt
		))
	}

	@Get(':postId')
	async getPostById(@Param('postId') postId: string) {
		const post = await this.postService.getPostById(postId)

		return new PostPorIdDTO(
			post.id,
			post.usuario.nome,
			post.titulo,
			post.conteudo,
			post.createdAt,
			post.updatedAt
		)
	}

	@UseGuards(AuthGuard)
	@Put(':postId')
	async editaPost(
		@Param('postId') postId: string,
		@Body() dadosPost: EditaPostDTO
	) {
		const post = await this.postService.editaPost(postId, dadosPost)
		return post
	}

	@UseGuards(AuthGuard)
	@Delete(':postId')
	async deletaPost(@Param('postId') postId: string) {
		return await this.postService.deletaPost(postId)
	}
}