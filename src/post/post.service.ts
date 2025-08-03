import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { Repository, Like } from "typeorm";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { CriaPostDTO } from "./dto/CriaPostDTO";
import { EditaPostDTO } from "./dto/EditaPostDTO";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>
	) {}

	async criaPost(dadosPost: CriaPostDTO) {
		const usuario = await this.usuarioRepository.findOneBy({id: dadosPost.usuarioId})

		if(!usuario) {
			throw new NotFoundException('Usuario não encontrado')
			
		}

		const postEntity = new PostEntity()
		postEntity.titulo = dadosPost.titulo
		postEntity.conteudo = dadosPost.conteudo
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

	async editaPost(postId: string, dadosPost: EditaPostDTO) {
		const post = await this.postRepository.findOneBy({ id: postId })

		if (!post) {
			throw new NotFoundException('Post não encontrado')
		}

		if (dadosPost.titulo) {
			post.titulo = dadosPost.titulo
		}
		
		if (dadosPost.conteudo) {
			post.conteudo = dadosPost.conteudo
		}

		return await this.postRepository.save(post)
	}

	async deletaPost(postId: string) {
		const post = await this.postRepository.findOneBy({ id: postId })

		if (!post) {
			throw new NotFoundException('Post não encontrado')
		}

		await this.postRepository.remove(post)
		return { message: 'Post deletado com sucesso' }
	}

	async buscaPosts(termo: string) {
		if (!termo) {
			return await this.listarPosts()
		}

		const posts = await this.postRepository.find({
			where: [
				{ titulo: Like(`%${termo}%`) },
				{ conteudo: Like(`%${termo}%`) }
			],
			relations: {
				usuario: true
			}
		})

		return posts
	}
}