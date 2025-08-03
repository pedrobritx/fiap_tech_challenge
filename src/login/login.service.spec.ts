import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BuscaUsuarioPorEmailDTO } from 'src/usuario/dto/BuscaUsuarioPorEmail.dto';
import { ConfigService } from '@nestjs/config';

jest.mock('bcrypt');

describe('LoginService', () => {
  let service: LoginService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;

  const mockUsuario = {
    id: '1',
    nome: 'Test User',
    email: 'test@test.com',
    senha: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
		ConfigService,
        LoginService,
        {
          provide: UsuarioService,
          useValue: {
            buscaUsuarioPorEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginDto = { email: 'test@test.com', senha: 'password' };
      const mockToken = { access_token: 'jwt-token' };

      jest.spyOn(usuarioService, 'buscaUsuarioPorEmail').mockResolvedValue(mockUsuario as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('jwt-token');

      const result = await service.login(loginDto.email, loginDto.senha);

      expect(usuarioService.buscaUsuarioPorEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.senha, mockUsuario.senha);
      expect(jwtService.sign).toHaveBeenCalledWith({
		usuario: mockUsuario.nome,
        sub: mockUsuario.id,
        email: mockUsuario.email,
      },
	  {secret: 'test-secret' });
      expect(result.token).toEqual(mockToken.access_token);
    });

    it('should throw UnauthorizedException with invalid email', async () => {
      const loginDto = { email: 'invalid@test.com', senha: 'password' };

      await expect(service.login(loginDto.email,loginDto.senha)).rejects.toThrow(UnauthorizedException);

    });

    it('should throw UnauthorizedException with invalid password', async () => {
      const loginDto = { email: 'test@test.com', senha: 'wrongpassword' };

      jest.spyOn(usuarioService, 'buscaUsuarioPorEmail').mockResolvedValue(mockUsuario as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto.email,loginDto.senha)).rejects.toThrow(UnauthorizedException);
    });
  });
});