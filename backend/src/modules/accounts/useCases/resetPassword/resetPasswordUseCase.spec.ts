import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  FakeHashProvider
} from '../../providers/HashProvider/fakes/FakeHashProvider';
import {
  FakeUsersRepository
} from '../../repositories/fakes/FakeUsersRepository';
import {
  FakeUserTokensRepository
} from '../../repositories/fakes/FakeUserTokenRepository';
import { ResetPasswordUseCase } from './resetPasswordUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordUseCase = new ResetPasswordUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const newDateWithExpirationOf2Hours = new Date();

    newDateWithExpirationOf2Hours.setHours(
      newDateWithExpirationOf2Hours.getHours() + 2,
    );

    const token = uuid();

    await fakeUserTokensRepository.generate(
      user.id,
      token,
      newDateWithExpirationOf2Hours,
    );

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordUseCase.execute(
      token,
      '123123',
    );

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordUseCase.execute(
        'non-existing-token',
        '123456',
      ),
    ).rejects.toEqual(
      new NotFoundException({
        title: 'Falha ao recuperar senha!',
        message: 'Token não existe!',
        data: null,
        cod: 'not.found'
      })
    );
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const newDateWithExpirationOf2Hours = new Date();

    newDateWithExpirationOf2Hours.setHours(
      newDateWithExpirationOf2Hours.getHours() + 2,
    );

    const token = uuid();

    await fakeUserTokensRepository.generate(
      'non-existing-user',
      token,
      newDateWithExpirationOf2Hours
    );

    await expect(
      resetPasswordUseCase.execute(
        token,
        '123456',
      ),
    ).rejects.toEqual(
      new NotFoundException({
        title: 'Falha ao recuperar senha!',
        message: 'Usuário não existe!',
        data: null,
        cod: 'not.found'
      })
    );
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const newDateWithExpirationOf2Hours = new Date();

    newDateWithExpirationOf2Hours.setHours(
      newDateWithExpirationOf2Hours.getHours() + 2,
    );

    const token = uuid();


    await fakeUserTokensRepository.generate(
      user.id,
      token,
      newDateWithExpirationOf2Hours,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordUseCase.execute(
        token,
        '123123',
      ),
    ).rejects.toEqual(
      new BadRequestException({
        title: 'Falha ao recuperar senha!',
        message: 'Token expirado!',
        data: null,
        cod: 'token.expired'
      })
    );
  });
});
