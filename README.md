# tic-tac-toe

## This repo is managed by [Turborepo](https://turborepo.org/)

### Getting started

---

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

-   animations
    -   ~~initial~~
    -   ~~move~~
    -   ~~winning~~
    -   ~~draw~~
-   i18n
-   online game end screen
    -   play again option
    -   leave
-   AI
    -   smarter AI, possibly with adjustable difficulty
    -   fake AI players in online mode
-   make sure game looks good on mobile devices
-   work on menu options look, add some images, in queue indicator
-   backend rethink and refactor, runtime typechecking
-   maybe we don't need to send whole game state on each player move
-   backend tests
-   dockerization of apps
-   deployment on AWS
-   mobile app (React Native)
