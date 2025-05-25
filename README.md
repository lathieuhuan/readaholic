# Repo set up steps

## Monorepo with turbo

1. Init with package.json

```
{
  "name": "readaholic",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "check-types": "turbo run check-types"
  },
  "devDependencies": {
    "prettier": "3.5.3",
    "turbo": "2.5.2",
    "typescript": "5.8.3"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20"
  }
}
```

2. Add turbo.json

3. Add pnpm-workspace.yaml

```
packages:
  - "apps/*"
  - "packages/*"
```

4. Add directories: apps & packages. Add eslint-config & typescript-config to packages.

## NextJS App

1. Init

```sh
pnpm dlx create-next-app@15.3.0 apps/app-name --typescript --tailwind --app --src-dir --turbopack --use-pnpm --skip-install
```

2. Modify package.json

Add eslint from npm, and eslint-config, typescript-config from workspace.

```
{
  ...
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --max-warnings 0",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.1.3",
    "@types/node": "22.14.0",
    "@types/react": "19.1.0",
    "@types/react-dom": "19.1.1",
    "eslint": "9.25.0",
    "eslint-config": "workspace:*",
    "tailwindcss": "4.1.3",
    "typescript": "5.8.3",
    "typescript-config": "workspace:*"
  }
}
```

3. Add eslint.config.js

4. Install packages and test run dev.
