[![CI](https://github.com/alex-kim-dev/vite-react-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/alex-kim-dev/vite-react-template/actions/workflows/ci.yml)

# Vite React template

## Features

- PNPM
- Vite
  - import alias `~/` mapped to `src`, `/` to `public`
  - import SVGs as react components (SVGR)
  - dev server with HTTP/2 (HTTPS + mkcert)
- React
- Typescript with strict linting
- Vitest + React Testing Library + Happy Dom
- Eslint:
  - typescript-eslint strict config
  - plugins react, hooks, jsx a11y
  - plugin import
  - import sorting
- Stylelint:
  - standard config
  - css properties sorting by groups
  - enforced use of logical properties
  - baseline
- Prettier & editorconfig
- Commitlint: conventional commits
- pre-commit hook for formatting/linting/testing staged files, pre-push hook for checking everything
- CI on push & pr, in-progress workflow cancelling if a new one is queued, dependencies caching

## Usage

1. Click the `Use this template` button or clone locally:

   ```sh
   pnpx degit alex-kim-dev/vite-react-template vite-project
   ```

   Both methods will clean the git history.

   _[degit](https://github.com/Rich-Harris/degit)_

2. Update & install the dependencies:

   ```sh
   pnpx ncu -u && pnpm i
   ```

   _[npm-check-updates](https://github.com/raineorshine/npm-check-updates)_

3. Change the name, description, author, license, links in `package.json`.
4. Check out the available scripts in `package.json` or execute `pnpm run`.
