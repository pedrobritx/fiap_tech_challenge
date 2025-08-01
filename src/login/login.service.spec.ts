import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
        LoginService,
        {
          provide: UsuarioService,
          useValue: {
            buscaPorEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
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

      jest.spyOn(usuarioService, 'buscaPorEmail').mockResolvedValue(mockUsuario as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('jwt-token');

      const result = await service.login(loginDto);

      expect(usuarioService.buscaPorEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.senha, mockUsuario.senha);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUsuario.id,
        email: mockUsuario.email,
      });
      expect(result).toEqual(mockToken);
    });

    it('should throw UnauthorizedException with invalid email', async () => {
      const loginDto = { email: 'invalid@test.com', senha: 'password' };

      jest.spyOn(usuarioService, 'buscaPorEmail').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with invalid password', async () => {
      const loginDto = { email: 'test@test.com', senha: 'wrongpassword' };

      jest.spyOn(usuarioService, 'buscaPorEmail').mockResolvedValue(mockUsuario as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});