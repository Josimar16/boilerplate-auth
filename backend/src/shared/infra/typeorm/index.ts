import { database } from "./database";

export default () => ({
  database,
  app: {
    port: process.env.APP_PORT
  }
});