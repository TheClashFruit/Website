<img alt="Website Banner" src="https://cdn-new.theclashfruit.me/forgejo/website/banner.svg" width="100%">

<h1 align="center">Website</h1>

<p align="center">
  <img alt="Issues" src="https://img.shields.io/badge/dynamic/json?color=yellow&label=issues&query=%24.open_issues_count&url=https%3A%2F%2Fgit.theclashfruit.me%2Fapi%2Fv1%2Frepos%2FTheClashFruit%2FWebsite">
  <img alt="Pull Requests" src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=pull%20requests&query=%24.open_pr_counter&url=https%3A%2F%2Fgit.theclashfruit.me%2Fapi%2Fv1%2Frepos%2FTheClashFruit%2FWebsite">

  <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fbeta.theclashfruit.me">

  <img alt="License (Apache 2.0)" src="https://img.shields.io/badge/license-Apache%202.0-red.svg">
</p>

<p align="center">
  My website written with Next.js.
</p>

## New Version!

I'm doing a redesign over on the [`dev/redesign`](https://git.theclashfruit.me/TheClashFruit/Website/src/branch/dev/redesign) branch, it's the deployed version on [beta.theclashfruit.me](https://beta.theclashfruit.me).

## Developing

1. Install dependencies with `pnpm install`.
2. Copy `.env` to `.env.local` and fill in the values.
3. Set up the database from `tools/setup.sql` if needed.
4. Run the development server with `pnpm run dev`.
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying

1. Install dependencies with `pnpm install`.
2. Run `node tools/setup.mjs` to set up env variables and the database and build the code.
3. Run `pnpm start` to start the production server.

## Contributing

Feel free to contribute, just make sure you are following design patterns I used and use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. If you find any issues on my site please open an issue, so I can fix them. If you have any other questions you can join my Discord server at [discord.gg/CWEApqJ6rc](https://discord.gg/CWEApqJ6rc).  

## License

```
Copyright 2023 - 2024 TheClashFruit

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```