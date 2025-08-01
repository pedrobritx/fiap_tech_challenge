import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CriaPostDTO } from './dto/CriaPostDTO';
import { EditaPostDTO } from './dto/EditaPostDTO';

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<PostEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;

  const mockPost = {
    id: '1',
    titulo: 'Test Post',
    conteudo: 'Test Content',
    usuario: { id: '1', nome: 'Test User', email: 'test@test.com' },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsuario = {
    id: '1',
    nome: 'Test User',
    email: 'test@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('criaPost', () => {
    it('should create a post successfully', async () => {
      const criaPostDto: CriaPostDTO = {
        usuarioId: '1',
        titulo: 'Test Post',
        conteudo: 'Test Content'
      };

      jest.spyOn(usuarioRepository, 'findOneBy').mockResolvedValue(mockUsuario as UsuarioEntity);
      jest.spyOn(postRepository, 'save').mockResolvedValue(mockPost as PostEntity);

      const result = await service.criaPost(criaPostDto);

      expect(usuarioRepository.findOneBy).toHaveBeenCalledWith({ id: criaPostDto.usuarioId });
      expect(postRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException when user not found', async () => {
      const criaPostDto: CriaPostDTO = {
        usuarioId: '999',
        titulo: 'Test Post',
        conteudo: 'Test Content'
      };

      jest.spyOn(usuarioRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.criaPost(criaPostDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('listarPosts', () => {
    it('should return array of posts', async () => {
      const posts = [mockPost];
      jest.spyOn(postRepository, 'find').mockResolvedValue(posts as PostEntity[]);

      const result = await service.listarPosts();

      expect(postRepository.find).toHaveBeenCalledWith({
        relations: { usuario: true }
      });
      expect(result).toEqual(posts);
    });
  });

  describe('getPostById', () => {
    it('should return a post when found', async () => {
      jest.spyOn(postRepository, 'findOne').mockResolvedValue(mockPost as PostEntity);

      const result = await service.getPostById('1');

      expect(postRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: { usuario: true }
      });
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException when post not found', async () => {
      jest.spyOn(postRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getPostById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('editaPost', () => {
    it('should update a post successfully', async () => {
      const editaPostDto: EditaPostDTO = { titulo: 'Updated Title', conteudo: 'Updated Content' };
      const updatedPost = { ...mockPost, ...editaPostDto };

      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(mockPost as PostEntity);
      jest.spyOn(postRepository, 'save').mockResolvedValue(updatedPost as PostEntity);

      const result = await service.editaPost('1', editaPostDto);

      expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(postRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedPost);
    });

    it('should throw NotFoundException when post not found', async () => {
      const editaPostDto: EditaPostDTO = { titulo: 'Test' };
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.editaPost('999', editaPostDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletaPost', () => {
    it('should delete a post successfully', async () => {
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(mockPost as PostEntity);
      jest.spyOn(postRepository, 'remove').mockResolvedValue(mockPost as PostEntity);

      const result = await service.deletaPost('1');

      expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(postRepository.remove).toHaveBeenCalledWith(mockPost);
      expect(result).toEqual({ message: 'Post deletado com sucesso' });
    });

    it('should throw NotFoundException when post not found', async () => {
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.deletaPost('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('buscaPosts', () => {
    it('should return posts matching search term', async () => {
      const posts = [mockPost];
      jest.spyOn(postRepository, 'find').mockResolvedValue(posts as PostEntity[]);

      const result = await service.buscaPosts('test');

      expect(postRepository.find).toHaveBeenCalledWith({
        where: [
          { titulo: expect.objectContaining({}) },
          { conteudo: expect.objectContaining({}) }
        ],
        relations: { usuario: true }
      });
      expect(result).toEqual(posts);
    });

    it('should return all posts when no search term provided', async () => {
      const posts = [mockPost];
      jest.spyOn(service, 'listarPosts').mockResolvedValue(posts as PostEntity[]);

      const result = await service.buscaPosts('');

      expect(service.listarPosts).toHaveBeenCalled();
      expect(result).toEqual(posts);
    });
  });
});