import { NotFoundException } from "@nestjs/common";
import {
  FakeMailProvider
} from "../../../../shared/container/providers/MailProvider/fakes/FakeMailProvider";
import {
  FakeUsersRepository
} from "../../repositories/fakes/FakeUsersRepository";
import {
  FakeUserTokensRepository
} from "../../repositories/fakes/FakeUserTokenRepository";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPasswordUseCase: ForgotPasswordUseCase;

describe('Forgot Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    forgotPasswordUseCase = new ForgotPasswordUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await forgotPasswordUseCase.execute('johndoe@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      forgotPasswordUseCase.execute('johndoe@example.com'),
    ).rejects.toEqual(
      new NotFoundException({
        title: 'Falha ao recuperar senha!',
        message: 'Usuário não existe!',
        data: null,
        cod: 'not.found'
      })
    );
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await forgotPasswordUseCase.execute('john@example.com');

    const newDateWithExpirationOf2Hours = new Date();

    newDateWithExpirationOf2Hours.setHours(
      newDateWithExpirationOf2Hours.getHours() + 2
    );
    expect(generateToken).toBeCalled();
  });
});