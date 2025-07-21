import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfigService,
			inject: [PostgresConfigService]
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {expiresIn: '30m'}
			}),
			global: true,
		}),
		UsuarioModule,
		LoginModule,
		PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
