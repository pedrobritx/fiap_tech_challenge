import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class LoginService {
	constructor(
		private usuarioService: UsuarioService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	private async validaUsuario(email: string, senha: string) {
		const usuario = await this.usuarioService.buscaUsuarioPorEmail(email)

		if(usuario && senha === usuario.senha) {
			const {senha, ...resto} = usuario;

			return resto
		}

		return null
	}

	async login(email: string, senha: string) {
		const usuario = await this.validaUsuario(email, senha);

		if (!usuario) 
			throw new UnauthorizedException('Credenciais inválidas');

		const payload = {usuario: usuario.nome, sub: usuario.id};

		return {
			token: this.jwtService.sign(payload,{secret: this.configService.get<string>('JWT_SECRET')}),
			usuario
		}
		
	}
}