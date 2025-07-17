import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService
	) {}

	private extraiToken(request: Request) {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : null;
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extraiToken(request);

		if(!token) {
			throw new UnauthorizedException()
		}

		try {
			const payload = await this.jwtService.verifyAsync(token,{secret: 'capivara'});

			request['user'] = payload

			return true
		} catch (err) {
			throw new UnauthorizedException()
		}

	}
}