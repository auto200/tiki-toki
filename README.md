### [https://tiki-toki.vercel.app/](https://tiki-toki-web.vercel.app/)

### Modified version of tic-tac-toe game inspired by this video


https://github.com/auto200/tiki-toki/assets/49625375/f7909292-e7f4-4373-a640-559a31c78ae9


---

## This repo is managed by [Turborepo](https://turborepo.org/)

### Getting started

Clone the repo and install dependencies by running `yarn` command in the root of the project

### Development

To start developing run `yarn dev` in the root of the project, this will run `dev` script in all apps

### Adding new npm packages

Turborepo utilizes [workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), add new dependency by running `yarn workspace {app/package name} add {npm-package-name}` ex. `yarn workspace web add react-icons`

### Utilizing internal packages

To use internal package add it as a dev/dependency in app/package `package.json`

```json
// ex. web/package.json
{
    "dependencies": {
        "tsconfig": "*"
    }
}
```

#### Todos (no strict order):

-   i18n
-   AI
    -   smarter AI, possibly with adjustable difficulty
    -   fake AI players in online mode
-   make sure game looks good on mobile devices
-   we could not send whole game state on each player move
-   backend tests
-   dockerization of apps
-   deployment on AWS
-   mobile app (React Native)
