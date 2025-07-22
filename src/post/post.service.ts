import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { Repository } from "typeorm";
import { PostPorIdDTO } from "./dto/PostPorId.dto";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>
	) {}

	async criaPost(post: PostEntity) {
		const usuario = await this.usuarioRepository.findOneBy({id: post.id})

		if(!usuario) {
			throw new NotFoundException('Usuario não encontrado')
			
		}

		const postEntity = new PostEntity()
		postEntity.titulo = post.titulo
		postEntity.conteudo = post.conteudo
		postEntity.usuario = usuario

		const postCriado = await this.postRepository.save(postEntity)

		return postCriado
	}

	async listarPosts() {
		const posts = await this.postRepository.find({
			relations: {
				usuario: true
			}
		})

		return posts
	}

	async getPostById(postId: string) {
		const post = await this.postRepository.findOne({
			where: {
				id: postId
			},
			relations: {
				usuario: true
			}
		})

		if(!post) {
			throw new NotFoundException('Post não encontrado')
		}

		return post
	}
}