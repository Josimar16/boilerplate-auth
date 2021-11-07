import { FakeHashProvider } from "../../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository";
import { ShowProfileUserUseCase } from "./showProfileUserUseCase";

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let showProfileUserUseCase: ShowProfileUserUseCase;

describe('Profile User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    showProfileUserUseCase = new ShowProfileUserUseCase(fakeUsersRepository);
  });

  it('should be able show profile user', async () => {
    const password = await hashProvider.generateHash('123456');

    const userCreated = await fakeUsersRepository.create({
      name: 'John Joe',
      email: 'john.joe@example.com',
      password,
    })

    const user = await showProfileUserUseCase.execute(userCreated.id);

    expect(user).toHaveProperty('id');
  });
});