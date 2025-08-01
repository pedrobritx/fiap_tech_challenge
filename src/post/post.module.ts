import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, UsuarioEntity])],
	controllers: [PostController],
	providers: [PostService]
})
export class PostModule {}