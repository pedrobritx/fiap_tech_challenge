import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UuidValidationPipe } from "../common/pipes/uuid-validation.pipe";
import { PostService } from "./post.service";
import { ListPostsDTO } from "./dto/ListaPosts.dto";
import { CriaPostDTO } from "./dto/CriaPostDTO";
import { AuthGuard } from "src/guards/auth.guard";
import { PostPorIdDTO } from "./dto/PostPorId.dto";
import { EditaPostDTO } from "./dto/EditaPostDTO";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('/post')
export class PostController {

	constructor(
		private postService: PostService
	) {}

	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	@Post()
	@ApiOperation({ summary: 'Criar um novo post' })
	@ApiResponse({ status: 201, description: 'Post criado com sucesso' })
	@ApiResponse({ status: 400, description: 'Dados inválidos' })
	async criaPost(
		@Body() dadosPost: CriaPostDTO
	) {
		return await this.postService.criaPost(dadosPost)
	}

	@Get()
	@ApiOperation({ summary: 'Listar todos os posts' })
	@ApiResponse({ status: 200, description: 'Lista de posts retornada com sucesso', type: [ListPostsDTO] })
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
	async getPostById(@Param('postId', UuidValidationPipe) postId: string) {
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
		@Param('postId', UuidValidationPipe) postId: string,
		@Body() dadosPost: EditaPostDTO
	) {
		const post = await this.postService.editaPost(postId, dadosPost)
		return post
	}

	@UseGuards(AuthGuard)
	@Delete(':postId')
	async deletaPost(@Param('postId', UuidValidationPipe) postId: string) {
		return await this.postService.deletaPost(postId)
	}
}