# StackMitra

StackMitra is a React single page application built with Vite.

Use Node.js 22.16.0 (recorded in `.nvmrc`) or another version supported by Vite 8.

## Local development

```sh
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and set `VITE_CONTACT_FORM_ENDPOINT` to an HTTPS form endpoint that accepts a JSON `POST` with the fields `name`, `email`, `selection`, `description`, `budget`, and `deadline`. The endpoint must allow browser requests from the deployed site and return a successful 2xx response. Do not put private API keys in `VITE_` variables; Vite includes them in the public client bundle.

If the endpoint is not configured, the contact form reports that it is unavailable and points visitors to Instagram.

## Production build

```sh
npm ci
npm run build
```

The deployable static site is written to `dist/`. Test the output locally with `npm run preview`.

## Deploy

The repository includes SPA fallback rules for Netlify (`public/_redirects`) and Vercel (`vercel.json`) so direct visits to project detail routes work.

- **Netlify:** use `npm run build` as the build command and `dist` as the publish directory. Set `VITE_CONTACT_FORM_ENDPOINT` in the site's environment variables, then redeploy.
- **Vercel:** use the Vite preset, `npm run build`, and `dist`. Set `VITE_CONTACT_FORM_ENDPOINT` in the project's environment variables for each environment, then redeploy.

After deployment, check the home page, project filters and detail URLs, mobile navigation, and contact form success and failure states. Confirm the configured endpoint is HTTPS and accepts requests from the production domain.
