# How to run this project

## Locally

- Install dependencies:

```bash
npm install
```
- Run the project:

```bash
npm run cy:open
```

- Follow the instructions to run manually the tests:

### Headless
- We can run the tests in headless mode:

```bash
npm run cy:run
```

# On server

- Install NodeJS V16.x:
- Install dependencies:

```bash
npm install
```

- Run the project:
```bash
npm run cy:run
```

# Update configurations

- Change baseUrl configuration in the file `cypress.config.js`:

```js
baseUrl: 'http://localhost:3000'
```

- Change the fixture in the file `cypress/fixture/user.json` adding a valid email to run the tests:

```js
{
  "email": "validemail@email.com",
}
```
