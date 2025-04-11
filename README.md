## Create Next App

```
pnpm dlx create-next-app@15.3.0 . --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-pnpm --skip-install
```

package.json
```
"dependencies": {
    "next": "15.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0"
},
"devDependencies": {
    "@eslint/eslintrc": "3.3.1",
    "@tailwindcss/postcss": "4.1.3",
    "@types/node": "20.17.30",
    "@types/react": "19.1.0",
    "@types/react-dom": "19.1.1",
    "eslint": "9.24.0",
    "eslint-config-next": "15.2.5",
    "tailwindcss": "4.1.3",
    "typescript": "5.8.3"
}
```

## shadcn

```
pnpm dlx shadcn@latest init
```

package.json
```
"dependencies": {
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "lucide-react": "0.487.0",
    "next": "15.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.2.5"
}
```

## next-intl

```
npm install next-intl
```

New or changed files:
```
├── messages
│   ├── en.json
│   └── ...
├── next.config.ts
└── src
    ├── i18n
    │   ├── routing.ts
    │   ├── navigation.ts
    │   └── request.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── page.tsx
```
---

**Note**

When running dev, you may encounter this error

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up.
```

It is caused by some browser extensions like ColorZilla. Workaround: https://github.com/vercel/next.js/discussions/71577