import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ALREADY_REGISTERED_ERROR } from "./auth.constants";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR)
    }

    return this.authService.createUser(dto)
  }

  @HttpCode(200)
  @Post('login')
  async login() {

  }
}
