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
@Controller('/posts')
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
	@ApiOperation({ summary: 'Buscar posts por palavra-chave' })
	@ApiResponse({ status: 200, description: 'Posts encontrados', type: [ListPostsDTO] })
	@ApiResponse({ status: 400, description: 'Termo de busca inválido' })
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
	@ApiOperation({ summary: 'Obter detalhes de um post' })
	@ApiResponse({ status: 200, description: 'Post encontrado', type: PostPorIdDTO })
	@ApiResponse({ status: 400, description: 'ID inválido' })
	@ApiResponse({ status: 404, description: 'Post não encontrado' })
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
	@ApiBearerAuth('access-token')
	@Put(':postId')
	@ApiOperation({ summary: 'Editar um post existente' })
	@ApiResponse({ status: 200, description: 'Post atualizado com sucesso', type: PostPorIdDTO })
	@ApiResponse({ status: 400, description: 'Dados inválidos' })
	@ApiResponse({ status: 401, description: 'Token de acesso inválido' })
	@ApiResponse({ status: 404, description: 'Post não encontrado' })
	async editaPost(
		@Param('postId', UuidValidationPipe) postId: string,
		@Body() dadosPost: EditaPostDTO
	) {
		const post = await this.postService.editaPost(postId, dadosPost)
		return post
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	@Delete(':postId')
	@ApiOperation({ summary: 'Excluir um post' })
	@ApiResponse({ status: 200, description: 'Post excluído com sucesso' })
	@ApiResponse({ status: 400, description: 'ID inválido' })
	@ApiResponse({ status: 401, description: 'Token de acesso inválido' })
	@ApiResponse({ status: 404, description: 'Post não encontrado' })
	async deletaPost(@Param('postId', UuidValidationPipe) postId: string) {
		return await this.postService.deletaPost(postId)
	}
}