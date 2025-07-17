import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioEntity])],
	controllers: [LoginController],
	providers: [LoginService, JwtService, UsuarioService]
})
export class LoginModule {}
