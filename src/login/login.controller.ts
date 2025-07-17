import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login.service";

@Controller('/login')
export class LoginController {
	constructor(
		private loginService: LoginService
	) {}

	@Post()
	async login(@Body() loginDto: LoginDto) {
		const {email, senha} = loginDto

		return this.loginService.login(email, senha)
	}
}