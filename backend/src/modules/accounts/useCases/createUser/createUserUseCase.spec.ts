import { BadRequestException } from "@nestjs/common";
import { FakeMailProvider } from "../../../../shared/container/providers/MailProvider/fakes/FakeMailProvider";
import { FakeHashProvider } from "../../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository";
import { CreateUserUseCase } from "./createUserUseCase";

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let mailProvider: FakeMailProvider;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    mailProvider = new FakeMailProvider();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository, hashProvider, mailProvider);
  });

  it('should be able to create new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new user, because email already exists', async () => {
    await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    });

    expect(createUserUseCase.execute({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password: '123456'
    })).rejects.toEqual(
      new BadRequestException({
        title: 'Falha ao cadastrar!',
        message: 'Usuário com esse email já existe!',
        data: null,
        cod: 'bad.request'
      })
    );
  });
});