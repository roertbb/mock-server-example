import "@testing-library/jest-dom/extend-expect";
import { drop } from "@mswjs/data";
import { client } from "./ApolloClient";
import { server } from "./mockServer/server";
import { db } from "./mockServer/db";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  return client.clearStore();
});

afterEach(() => {
  drop(db);
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
