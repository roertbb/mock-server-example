import { handlers as authorHandlers } from './handlers/authors.handler'
import { handlers as bookHandlers } from './handlers/books.handlers'

export const handlers = [...authorHandlers, ...bookHandlers]
