# Set up Web Application

## Define application structure

- Define paths in tsconfig.json for major parts of the application

```
{
  "compilerOptions": {
    ...
    "paths": {
      "@app/*": ["./src/app/*"],
      "@components/*": ["./src/components/*"],
      "@config/*": ["./src/config/*"],
      "@constants/*": ["./src/constants/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@lib/*": ["./src/lib/*"],
      "@procedures/*": ["./src/procedures/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@validation-schemas/*": ["./src/validation-schemas/*"],
    }
  }
}
```

## Set up lib components

Tech: shadcn, tailwind (NextJS app should be already init with tailwind)

1. Init

```sh
pnpm dlx shadcn@latest init
```

```
{
  "scripts": {
    ...
    "add-shadcn": "pnpm dlx shadcn@latest add"
  },
  "dependencies": {
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "lucide-react": "0.487.0",
    "next": "15.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "3.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.1.3",
    "@types/node": "22.14.0",
    "@types/react": "19.1.0",
    "@types/react-dom": "19.1.1",
    "eslint": "9.25.0",
    "eslint-config": "workspace:*",
    "tailwindcss": "4.1.3",
    "tw-animate-css": "1.2.5",
    "typescript": "5.8.3",
    "typescript-config": "workspace:*"
  }
}
```

2. Set up components.json

```
{
  "aliases": {
    "components": "@lib/components",
    "utils": "@lib/utils/functions",
    "ui": "@lib/components",
    "lib": "@lib",
    "hooks": "@lib/hooks"
  },
}
```

3. Test add shadcn component

```sh
pnpm run add-shadcn button
```

## Set up translation

Tech: next-intl

1. Init

```sh
npm install next-intl
```

2. Add src/messages directory with translations in json files.
3. Add @config/next-intl
4. Change ./next.config.ts and src/middleware.ts
5. Change root layout and page in src/app, and add not-found.
6. Make app/[locale] directory where actual app routes are located.
7. Config [locale]/layout with next-intl.
8. Test run dev.

New or changed files

```
src
├── messages
│   ├── en.json
│   └── ...
├── config
│   └── next-intl
│       ├── routing.ts
│       ├── navigation.ts
│       └── request.ts
└── app
    ├── [locale]
    │   ├── layout.tsx
    │   └── page.tsx
    ├── layout.tsx
    ├── page.tsx
    └── not-found.tsx
```

9. (Optional) Re-export next-intl navigation in components/Link, hooks/navigation, utils/navigation for abstraction.

## Set up base form

Tech: react-hook-form, zod, next-intl, @hookform/resolvers

1. Install

```sh
pnpm add react-hook-form zod @hookform/resolvers
```

2. Config zod in @config/zod
3. Import error-map-config.ts in zod config into instrumentation-client.ts
4. Add shadcn label, then make @components/form with the tech stack

## Set up notifier

Tech: sonner

1. Install sonner

```sh
pnpm add sonner
```

2. Place sonner's Toaster in [locale]/layout
3. Make @lib/components/message.tsx and @utils/notifier.ts

## Set up Authentication

Tech: next, jose

1. Install jose
2. Make @utils/auth-utils.ts, api/auth/login
3. Make [locale]/login page