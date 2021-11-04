import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../shared/infra/http/middlewares/guard/jwt-auth.guard';
import { UserLogged } from '../../../../shared/infra/http/middlewares/UserLogged';
import { ShowProfileUserUseCase } from '../../useCases/showProfileUser/showProfileUserUseCase';
import { User } from '../typeorm/entities/User';

@Controller('users')
class ProfileRouter {
  constructor(private showProfileUserUseCase: ShowProfileUserUseCase) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async show(@UserLogged() user: User): Promise<User> {
    const { id } = user;

    return await this.showProfileUserUseCase.execute(id);
  }
}

export { ProfileRouter };