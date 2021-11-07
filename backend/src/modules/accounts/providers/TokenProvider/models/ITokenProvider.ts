interface ITokenProvider {
  generateToken(id: string): Promise<string>;
  generateRefreshToken(expires_in: string, secret: string): Promise<string>;
}

export { ITokenProvider };
