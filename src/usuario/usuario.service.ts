import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { BuscaUsuarioPorEmailDTO } from "./dto/BuscaUsuarioPorEmail.dto";
import { hash } from 'bcrypt';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>
	) {}

	async criaUsuario(usuario: UsuarioEntity) {
		const usuarioComEmailJaCriado = await this.usuarioRepository.findOneBy({email: usuario.email})

		if(usuarioComEmailJaCriado) {
			throw new BadRequestException('Email já cadastrado')
		}

		usuario.senha = await hash(usuario.senha,10)

		const usuarioCriado = await this.usuarioRepository.save(usuario)
		const usuarioFormatado = new ListaUsuarioDTO(
			usuarioCriado.id,
			usuarioCriado.nome,
			usuarioCriado.email,
			usuarioCriado.createdAt,
			usuarioCriado.updatedAt
		)

		return usuarioFormatado
	}

	async listaUsuarios() {
		const usuariosSalvos = await this.usuarioRepository.find()
		const usuariosLista = usuariosSalvos.map(usuario => new ListaUsuarioDTO(
			usuario.id,
			usuario.nome,
			usuario.email,
			usuario.createdAt,
			usuario.updatedAt
		))

		return usuariosLista
	}

	async buscaUsuarioPorId(id: string) {
		const usuario = await this.usuarioRepository.findOneBy({id})

		if(!usuario) {
			throw new NotFoundException('Usuario não encontrado')
		}

		return new ListaUsuarioDTO(
			usuario.id,
			usuario.nome,
			usuario.email,
			usuario.createdAt,
			usuario.updatedAt
		)
	}

	async buscaUsuarioPorEmail(email: string) {
		const usuario = await this.usuarioRepository.findOneBy({email})

		if(!usuario)
			throw new NotFoundException('Usuário não encontrado')

		return new BuscaUsuarioPorEmailDTO(
			usuario.id,
			usuario.nome,
			usuario.email,
			usuario.senha
		)
	}

	async deletaUsuario(id: string) {
		const usuario = await this.usuarioRepository.findOneBy({id})

		if(!usuario) {
			throw new NotFoundException('Usuario não encontrado')
		}

		await this.usuarioRepository.delete(id)

		return
	}
}


