# LIGAS - Time measurement made easy!

LIGAS is a tool to simplify the measurement and managment of round times during a competition.

- :tada: [Releases](https://github.com/tametsi/ligas/releases/)
- :pushpin: [Online Version](https://tametsi.github.io/ligas/)
- :memo: [Changelog](https://github.com/tametsi/ligas/blob/main/CHANGELOG.md)

## :telescope: Usage

The online version can be found [here](https://tametsi.github.io/ligas/)

There is also the option to use the app locally. To do so, follow these steps:

1. download [the latest :ghost: release](https://github.com/tametsi/ligas/releases/latest/download/ligas.zip)
2. unzip the `ligas.zip` file
3. open the `ligas` folder
4. open the `index.html` file with a modern browser (e.g. [Firefox](https://www.mozilla.org/en-US/firefox/new/), [Brave](https://brave.com/), Chrome, (Edge, Opera))

## :electric_plug: Setup project

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

### :computer: Build to use locally

If you want to use the final app locally (with a `file://` URL), you will need to replace

<!-- prettier-ignore -->
```html
<!-- /dist/index.html -->
<script type="module" crossorigin src="./assets/index.[*].js"></script>
<!-- with -->
<script defer                     src="./assets/index.[*].js"></script>
```

## Libraries

- :key: [Svelte](https://svelte.dev/) and :art: [Sass](https://sass-lang.com/) are used for the UI
- :gem: [Vite](https://vitejs.dev/) is used to build the app
- :balloon: [Feather](http://feathericons.com/) provides the icons in the app

## License

This project is licensed under the
[MIT License](https://github.com/tametsi/ligas/blob/main/LICENSE)
