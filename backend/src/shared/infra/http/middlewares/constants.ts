export const jwtConstants = {
  secret: process.env.SECRET_KEY || '123',
  expiresIn: process.env.EXPIRES_IN,
};
