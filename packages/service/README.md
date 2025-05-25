# Readaholic Service

## Init package

1. Init with vite

```sh
pnpm create vite service
```

2. Add vite.config.ts
3. Add to package.json

```
{
  "main": "dist/main.js",
  "types": "dist/main.d.ts",
  "files": [
    "dist"
  ],
}
```

## Database

Tech: drizzle-orm
Directory: src/db
Function: Where database tables are defined.

_Note_: Config sql generation from database tables

1. Install (dev) drizzle-kit
2. Add script to package.json to run drizzle-kit
3. Add drizzle.config.ts

## Repository

Directory: src/interfaces
Function: Abstract database APIs into meaningful APIs for business.

## Service

Tech: decorators are used on service classes (proposal stage 3: https://github.com/tc39/proposal-decorators)
Directory: src/services
Function: Business logic handlers.
Note: Services do not throw on error, they return ErrorResponse instead. The backend uses this package should convert it into http error response.

_Set up vite to build decorators:_

1. Install -D vite-plugin-babel @babel/plugin-proposal-decorators
2. Add to vite.config.ts

```
import babel from "vite-plugin-babel";

export default defineConfig({
  ...
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [["@babel/plugin-proposal-decorators", { loose: true, version: "2022-03" }]],
      },
    }),
  ],
})
```

## Interfaces

Directory: src/interfaces
Function: Define entity and repository interfaces for integration among database, repositories, and services
_Note_: We borrow drizzle tables to define entities

## main-service (ReadaholicService)

Tech: @neondatabase/serverless (postgresql)
Function: A class for initiating database and all services.
