import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { ListPostsDTO } from "./dto/ListaPosts.dto";
import { CriaPostDTO } from "./dto/CriaPostDTO";
import { PostEntity } from "./post.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { PostPorIdDTO } from "./dto/PostPorId.dto";

@Controller('/post')
export class PostCOntroller {

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
}