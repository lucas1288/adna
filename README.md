ADNA Artist Website (Next.js 16)

## Development

```bash
yarn dev
```

App: http://localhost:3000  
CMS: http://localhost:3000/admin

## Decap CMS (test backend + local git repo)

The CMS config uses the Decap test backend by default and is also configured for the local git repo workflow.

1) Start the Next.js dev server
2) In another terminal, start the local backend server:

```bash
npx decap-server
```

3) Open http://localhost:3000/admin

With `local_backend: true`, the CMS writes directly to the local repo under `content/`.
