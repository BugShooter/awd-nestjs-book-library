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

## 9. Implement DTOs for the `books` resource corresponding to the OpenAPI specification

To implement the OpenAPI specification for the `books` resource, you need to have 3 DTOs: `create-book.dto.ts`, `update-book.dto.ts` and `response-book.dto.ts`.

In this step, we will create the DTOs and use decorators for validation, transformation and documentation.

- **Validation**: Ensures that the data sent to the API meets certain criteria (e.g., required fields, data types).
- **Transformation**: Converts the data into a specific format or structure before it is processed by the application.
- **Documentation**: Provides metadata about the API endpoints, making it easier for developers to understand how to use the API.

### Install the necessary packages:

```bash
npm install @nestjs/class-validator @nestjs/class-transformer @nestjs/swagger
```

In the create book DTO, you will define the properties required to create a new book.

### Create book DTO

Update a file named `create-book.dto.ts` in the `src/books/dto` directory:

```typescript
import { IsNotEmpty, IsInt, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: '1925' })
  publishedYear: number;
}
```

Used decorators:

- `@IsNotEmpty()`: Ensures that the field is not empty.
- `@IsString()`: Validates that the field is a string.
- `@IsInt()`: Validates that the field is an integer.
- `@ApiProperty()`: Provides metadata for Swagger documentation, including an example value.

### Update book DTO

The update book DTO will have the same properties but will allow partial updates.

### Response book DTO

The response book DTO will define the structure of the book object returned by the API.
Create a file named `response-book.dto.ts` in the `src/books/dto` directory:

```typescript
import { Expose } from '@nestjs/class-transformer';
import { IsInt, IsString, IsUUID } from '@nestjs/class-validator';

export class ResponseBookDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  author: string;

  @Expose()
  @IsInt()
  publishedYear: number;
}
```

Explanation of decorators used:

- `@Expose()`: Indicates that the property should be included in the serialized output.
- `@IsUUID()`: Validates that the field is a valid UUID.
- `@IsString()`: Validates that the field is a string.
- `@IsInt()`: Validates that the field is an integer.
- `@ApiProperty()`: Provides metadata for Swagger documentation, including an example value.

## 10. Enable Validation and Transformation to work

There are two main parts to enable validation and transformation in your NestJS application: incoming requests and outgoing responses.

### Incoming Requests

To enable validation and transformation in your NestJS application for incoming requests, you need to set up global pipes in your `main.ts` file:

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation of payloads
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

Explanation of the options used in `ValidationPipe`:

- `transform: true`: Automatically transforms the payload into the DTO class instance.
- `whitelist: true`: Strips properties that are not defined in the DTO.
- `forbidNonWhitelisted: true`: Throws an error if non-whitelisted properties are present.

### Outgoing Responses

For the outgoing response the NestJS don't apply the validation and transformation by automatically, so you need to use to use plainToClass function from `@nestjs/class-transformer` in the controller where you return the response.

```typescript
import { plainToClass } from '@nestjs/class-transformer';
import { ResponseBookDto } from './dto/response-book.dto';

@Get(':id')
async findOne(@Param('id') id: string): Promise<ResponseBookDto> {
  const book = await this.booksService.findOne(id);
  return plainToClass(ResponseBookDto, book); // Transform the book object to ResponseBookDto.
}
```

Explanation of the `plainToClass` function:

- `plainToClass(ResponseBookDto, book)`: Converts the plain JavaScript object `book` into an instance of the `ResponseBookDto` class, applying any transformation and validation defined in the DTO.

### 11. **Implement the BooksController**

Update the `books.controller.ts` file in the `src/books` directory to implement the CRUD operations for the books resource. Here is an example of how you can implement the controller.

```typescript
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseBookDto } from './dto/response-book.dto';
import { UUID } from 'node:crypto';
import { ParseUUIDPipe } from '@nestjs/common';
import { plainToClass } from '@nestjs/class-transformer';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiOkResponse({
    description: 'A list of books',
    type: ResponseBookDto,
    isArray: true,
  })
  async findAll(): Promise<ResponseBookDto[]> {
    const books = await this.booksService.findAll();
    return plainToClass(ResponseBookDto, books);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiOkResponse({
    description: 'A single book',
    type: ResponseBookDto,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<ResponseBookDto> {
    const book = await this.booksService.findOne(id);
    if (!book) throw new NotFoundException('Book not found');
    return plainToClass(ResponseBookDto, book);
  }
}
```

### Documentation of the BooksController

Use the decorators from `@nestjs/swagger` like `@ApiOperation`, `@ApiOkResponse`, and `@ApiNotFoundResponse` to document the API endpoints.

### Incoming request validation

Use the ParseUUIDPipe from `@nestjs/common` to validate the incoming request parameters, such as the book ID. This ensures that the ID is a valid UUID before processing the request.

### Outgoing response transformation with plainToClass

Use the `plainToClass` function from `@nestjs/class-transformer` to transform the response object to the DTO. This ensures that the response adheres to the structure defined in the DTO and applies any necessary transformations.

### Asynchronous operations

Use async/await for asynchronous operations to handle the database calls in a non-blocking manner.
Note that the return type of asynchronous function is `Promise<SomeType>`, regardless of the actual type returned by the function.

### Typing the response

Use the `ResponseBookDto` as the return type for the `findOne`, `update`, and `remove` methods to ensure that the response adheres to the structure defined in the DTO.

### Exception handling

Use the `NotFoundException` from `@nestjs/common` to handle cases where a book is not found. This will return a 404 status code and a descriptive error message.

# Dockerizing the NestJS Application

To dockerize the NestJS application, you need to create a `Dockerfile` in the root directory of your project. Here is a basic example of a `Dockerfile` for a NestJS application:

This `Dockerfile` does the following:

1. Uses the official Node.js image as the base image.
2. Sets the working directory to `/app`.
3. Copies the `package.json` and `package-lock.json` files to the working directory.
4. Installs the application dependencies.
5. Copies the rest of the application code to the working directory.
6. Builds the application.
7. Uses a smaller image for the production environment.
8. Copies the built application from the previous stage.
9. Exposes the application port (3000).
10. Starts the application.

## Building the Docker Image

To build the Docker image, run the following command in the root directory of your project:

```bash
docker build -t my-nestjs-app .
```

## Running the Docker Container

To run the Docker container, use the following command:

```bash
docker run -p 3000:3000 my-nestjs-app
```

This will map port 3000 of the container to port 3000 on your host machine, allowing you to access the application at `http://localhost:3000`.

## Create account on Docker Hub

To push your Docker image to Docker Hub, you need to create an account on Docker Hub if you don't have one already. Follow these steps:

1. Go to the [Docker Hub website](https://hub.docker.com/).
2. Click on the "Sign Up" button.
3. Fill in the required information to create your account.
4. Once your account is created, you can log in to Docker Hub from the command line using the following command:

```bash
docker login
```

You will be prompted to enter your Docker Hub username and password.

## Tagging the Docker Image

To tag your Docker image with your Docker Hub username, use the following command:

```bash
docker tag my-nestjs-app <your-dockerhub-username>/my-nestjs-app
```

## Pushing the Docker Image to Docker Hub

To push your Docker image to Docker Hub, use the following command:

```bash
docker push <your-dockerhub-username>/my-nestjs-app
```

Make sure to replace `my-nestjs-app` with the name of your Docker image. If you want to push it to a specific repository, you can use the following format:

```bash
docker push <your-dockerhub-username>/my-nestjs-app
```

## Running the Docker Container from Docker Hub

To run the Docker container from Docker Hub, use the following command:

```bash
docker run -p 3000:3000 <your-dockerhub-username>/my-nestjs-app
```

This will map port 3000 of the container to port 3000 on your host machine, allowing you to access the application at `http://localhost:3000`.

## Important Notes

### Docker Hub Repository Names

Docker Hub repository names should be in lowercase letters. If you try to push an image with uppercase letters in the repository name, you will get an error. Make sure to use only lowercase letters when naming your Docker Hub repository.

**Example with error (uppercase letters in repository name):**

```bash
$ docker images | grep awd
CodeShip404/awd-nestjs   latest   5484a00ce1ca   12 minutes ago   434MB

$ docker push CodeShip404/awd-nestjs:latest
The push refers to repository [CodeShip404/awd-nestjs]
Get "https://CodeShip404/v2/": dial tcp: lookup CodeShip404 on 127.0.0.53:53: server misbehaving
```

**Example with correct (all lowercase) repository name:**

```bash
$ docker tag CodeShip404/awd-nestjs:latest codeship404/awd-nestjs:latest

$ docker push codeship404/awd-nestjs:latest
The push refers to repository [docker.io/codeship404/awd-nestjs]
... # (push proceeds successfully)
```

As shown above, using uppercase letters in the repository name causes an error. Always use lowercase letters for Docker Hub repository names to avoid this issue.

### Dockerfile COPY

The `COPY` command in Dockerfile is used to copy files from the host machine into the Docker image.
The `COPY` command is not equivalent to the `cp -r` command in the terminal.
The `COPY src .` will copy the contents of the `src` directory into the current working directory in the Docker image
whereas `cp -r src .` will copy the entire `src` directory into the current working directory in the terminal

For example, if you have the following directory structure:

```
some-project/
├── Dockerfile
├── package.json
└── src/
   ├── app.module.ts
   └── main.ts
```

You can use the following `Dockerfile` to copy the contents of the `src` directory into the `/app` directory in the Docker image:

```dockerfile
WORKDIR /app
COPY package*.json ./
COPY src ./
```

This will copy the contents of the `src` directory directly into the `/app` directory in the Docker image, resulting in:

```
/app
├── app.module.ts
├── main.ts
├── package.json
└── package-lock.json
```

but possibly you want to have the `src` directory inside the `/app` directory, so that the structure looks like this:

```
/app
├── package.json
├── package-lock.json
└── src/
    ├── app.module.ts
    └── main.ts
```

You must copy to `./src` to copy the contents of the `src` directory into the `/app/src` directory in the Docker image:

```dockerfile
WORKDIR /app
COPY package*.json ./
COPY src ./src
```

This will copy the contents of the `src` directory into the `/app/src` directory in the Docker image, resulting in:

```/app/src/
├── app.module.ts
└── main.ts
```

### Dockerfile Best Practices

- Use multi-stage builds to reduce the size of the final image.
- Use a specific version of the base image to ensure consistency.
- Use `.dockerignore` to exclude unnecessary files from the build context.
