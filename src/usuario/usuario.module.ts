import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioEntity])],
	controllers: [UsuarioController],
	providers: [UsuarioService]
})
export class UsuarioModule {}
