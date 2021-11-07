import { UnauthorizedException } from '@nestjs/common';
import { 
  FakeHashProvider
} from '../../providers/HashProvider/fakes/FakeHashProvider';
import { 
  FakeTokenProvider
} from '../../providers/TokenProvider/fakes/FakeTokenProvider';
import { 
  FakeUsersRepository
} from '../../repositories/fakes/FakeUsersRepository';
import { 
  FakeUserTokensRepository
} from '../../repositories/fakes/FakeUserTokenRepository';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
      fakeTokenProvider
    );
  });

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    const response = await authenticateUserUseCase.execute({
      email: 'john.joe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'john.joe@example.com',
        password: '123456',
      }),
    ).rejects.toEqual(
      new UnauthorizedException('Combinação email/senha incorreta!')
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'john.joe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(
      new UnauthorizedException('Combinação email/senha incorreta!')
    );
  });
});