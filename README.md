# Create React App (GraphQL)

This repository illustrates how to use [Mock Service Worker](https://github.com/mswjs/msw) to mock a GraphQL API for development + tests in Create React App project.

## Running locally

```bash
$ npm start
```

## Tests

```bash
$ yarn test
```

- [`src/index.tsx`](src/index.js) conditionally enables mocking in `development` environment.
- [`src/ApolloClient.ts`](src/ApolloClient.js) uses an explicit `fetch` reference in order for requests to be captured and deferred until the Service Worker is ready. Necessary due to Apollo hoisting a native `window.fetch` call, preventing Mock Service Worker from properly capturing it.
- [`public/mockServiceWorker.js`](public/mockServiceWorker.js) the Service Worker, created by running `npx msw init public`.

### NodeJS

- [`src/setupTests.ts`](src/setupTests.js) enables mocking for unit tests via `beforeAll`/`afterAll` hooks.
