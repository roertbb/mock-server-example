import "@testing-library/jest-dom/extend-expect";
import { client } from "./ApolloClient";
import { server } from "./mockServer/server";
import { cleanUp } from "./mockServer/db";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  return client.clearStore();
});

afterEach(() => {
  server.resetHandlers();
  cleanUp();
});

afterAll(() => {
  server.close();
});
