interface ITokenProvider {
  generateToken(id: string): Promise<string>;
}

export { ITokenProvider };
