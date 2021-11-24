import { primaryKey } from "@mswjs/data";
import { v4 } from "uuid";
import faker from "faker";

export const author = {
  id: primaryKey(() => v4()),
  name: () => faker.name.findName(),
};
