# LIGAS - Time measurement made easy!

## Setup

Requires [Node.js](https://nodejs.org/)

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build the app
npm run build

# check the project with svelte-check
npm run check
```

### Build for local use

If you want to use the final app locally (with a `file://` URL), you will need to replace

```html
<!-- /dist/index.html -->
<script type="module" crossorigin src="./assets/index.[*].js"></script>
<!-- with -->
<script defer                     src="./assets/index.[*].js"></script>
```

## Libraries

- [Svelte](https://svelte.dev/) and [Sass](https://sass-lang.com/) are used for the UI
- [Vite](https://vitejs.dev/) is used to build the app
