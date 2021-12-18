import { handlers as authorHandlers } from "./handlers/authors.handlers";
import { handlers as bookHandlers } from "./handlers/books.handlers";

export const handlers = [...authorHandlers, ...bookHandlers];
