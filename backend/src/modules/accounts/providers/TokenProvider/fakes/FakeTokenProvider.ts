import { ITokenProvider } from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public async generateToken(id: string): Promise<string> {
    return id;
  }
}

export { FakeTokenProvider }