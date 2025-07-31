{# Readme file about awd-nestjs-book-library as a challange part of AWD #}
# NestJS Book Library API

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo"></a>
  <br>
  <a href="https://github.com/BugShooter/awd-nestjs-book-library/actions/workflows/ci.yml" target="_blank"><img src="https://github.com/BugShooter/awd-nestjs-book-library/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

## Description

This project is a part of the challenge from "Advanced Web Development" Bootcamp, where we focus on building a NestJS application that serves as a book library API corresponding to the OpenAPI specification. The API allows users to perform CRUD operations on books, including creating, reading, updating, and deleting book records.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# How to create same project from scratch

## 1. **Initialize the project**

Use the terminal to navigate to your project directory and run the following command to initialize a new NestJS project:

```bash
npx @nestjs/cli new nestjs-ci
cd nestjs-ci
npm install
```

## 2. **Set up Git**

Create a `.gitignore` file to exclude `node_modules` and other unnecessary files from being tracked by Git. You can use the following command:

```bash
touch .gitignore
```

Then add the following lines to your `.gitignore` file:

```
# .gitignore
node_modules
dist
```

Then, run the following commands to initialize Git and make your first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

## 3. **Create a GitHub repository** using gh CLI

Install the GitHub CLI if you haven't already. You can find installation instructions [here](https://cli.github.com/).


Authorize the GitHub CLI with your GitHub account by running:
```bash
gh auth login
```

Then, create a new repository on GitHub using the following command:
```bash
gh repo create nestjs-ci --public --source=. --remote=origin
```

## 4. **Create a GitHub Actions workflow**

Create a new directory called `.github/workflows` in your project root and create a file named `ci.yml` inside it:

```bash
mkdir -p .github/workflows
touch .github/workflows/ci.yml
``` 

Then, add the following content to the `ci.yml` file:

```yaml
name: CI
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```
This workflow will run on every push or pull request to the `main` branch. It checks out the code, installs Node.js, installs dependencies using `npm ci`, and runs tests.

For npm ci command It's important to ensure that your have `package-lock.json` committed to your repository, as `npm ci` relies on it to install the exact versions of dependencies specified in the lock file.

## 5. **Commit and push changes**

Add the `.github/workflows/ci.yml` file to your Git repository, commit the changes, and push them to GitHub:

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow"
git push origin main
```

This will trigger the GitHub Actions workflow you just created.

## 6. **Verify the CI workflow**

Go to your GitHub repository and navigate to the "Actions" tab. You should see the workflow running. If everything is set up correctly, it will pass the tests and show a green checkmark.

## 7. **Generate the NestJS resource for books**

To generate the CRUD (Create, Read, Update, Delete) operations for the books, you can use the NestJS CLI to generate a new resource:

```bash
npx @nestjs/cli generate resource books
```

This command will create a new `books` module, controller, and service in your project.

## 8. **Add OpenAPI support (optional)**

To add OpenAPI support to your NestJS application, you can use the `@nestjs/swagger` package. Install it by running:

```bash
npm install @nestjs/swagger
```

Then, update your `main.ts` file to set up Swagger:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Book Library API')
    .setDescription('A simple API to manage a collection of books')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
```
This will set up Swagger documentation for your API at the `/api/docs` endpoint.

To view the Swagger UI, start your NestJS application `npm start` and navigate to `http://localhost:3000/api` in your web browser.

## 9. Update the `books` resource corresponding to the OpenAPI specification
Update the generated `books` resource to implement the CRUD operations as per your requirements. You can modify the controller and service files to handle the logic for creating, reading, updating, and deleting books.

Update dto files to include validation decorators and Swagger decorators for API documentation.

