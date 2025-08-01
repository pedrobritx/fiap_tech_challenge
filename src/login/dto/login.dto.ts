import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ 
    description: 'Email do usuário',
    example: 'professor@escola.com',
    format: 'email'
  })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @ApiProperty({ 
    description: 'Senha do usuário',
    example: 'senha123',
    minLength: 6
  })
  @IsString()
  senha: string;
}