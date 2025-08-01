import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags('Autenticação')
@Controller('/login')
export class LoginController {
	constructor(
		private loginService: LoginService
	) {}

	@Post()
	@ApiOperation({ summary: 'Fazer login e obter token JWT' })
	@ApiResponse({ 
		status: 200, 
		description: 'Login realizado com sucesso',
		schema: {
			type: 'object',
			properties: {
				access_token: {
					type: 'string',
					example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
					description: 'Token JWT para autenticação'
				}
			}
		}
	})
	@ApiResponse({ status: 401, description: 'Credenciais inválidas' })
	@ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
	async login(@Body() loginDto: LoginDto) {
		const {email, senha} = loginDto

		return this.loginService.login(email, senha)
	}
}