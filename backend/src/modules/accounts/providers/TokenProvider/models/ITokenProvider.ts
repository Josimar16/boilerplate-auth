interface ITokenProvider {
  generateToken(id: string, expires_in: string): Promise<string>;
}

export { ITokenProvider };
