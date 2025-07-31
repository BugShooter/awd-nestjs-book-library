## Project Overview
Create a simple RESTful API using NestJS that allows users to access and manage books from a library.

Follow the OpenAPI specification provided below to implement the API endpoints.

```yaml
# OpenAPI Specification for Book Library API
openapi: 3.0.3
info:
  title: Book Library API
  description: A simple API to manage a collection of books.
  version: 1.0.0

servers:
  - url: http://localhost:3000/api
    description: Local development server

paths:
  /books:
    get:
      summary: List all books
      responses:
        '200':
          description: A list of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Add a new book
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookInput'
      responses:
        '201':
          description: Book created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'

  /books/{id}:
    get:
      summary: Get a book by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A single book
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

    put:
      summary: Update a book by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookInput'
      responses:
        '200':
          description: Book updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

    delete:
      summary: Delete a book by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Book deleted successfully
        '404':
          description: Book not found

components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: string
          example: "123e4567-e89b-12d3-a456-426614174000"
        title:
          type: string
          example: "The Great Gatsby"
        author:
          type: string
          example: "F. Scott Fitzgerald"
        publishedYear:
          type: integer
          example: 1925
    BookInput:
      type: object
      required:
        - title
        - author
        - publishedYear
      properties:
        title:
          type: string
        author:
          type: string
        publishedYear:
          type: integer
```

## Bonus: Users
Extend your application to include user management and authentication.

```yaml
# OpenAPI Specification for Book Library API with User Management
openapi: 3.0.3
info:
  title: Book Library API
  description: A simple API to manage a collection of books and users with authentication.
  version: 1.1.0

servers:
  - url: http://localhost:3000/api
    description: Local development server

paths:
  /books:
    get:
      summary: List all books
      security:
        - bearerAuth: []
      responses:
        '200':
          description: A list of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Add a new book
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookInput'
      responses:
        '201':
          description: Book created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'

  /books/{id}:
    get:
      summary: Get a book by ID
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A single book
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found
    put:
      summary: Update a book by ID
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookInput'
      responses:
        '200':
          description: Book updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found
    delete:
      summary: Delete a book by ID
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Book deleted
        '404':
          description: Book not found

  /users:
    get:
      summary: List all users
      security:
        - bearerAuth: []
      responses:
        '200':
          description: A list of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{id}:
    get:
      summary: Get user by ID
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
    put:
      summary: Update a user
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '200':
          description: User updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
    delete:
      summary: Delete a user
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: User deleted
        '404':
          description: User not found

  /auth:
    post:
      summary: Authenticate user and return token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AuthRequest'
      responses:
        '200':
          description: Successful login
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Invalid credentials

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Book:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        author:
          type: string
        publishedYear:
          type: integer
    BookInput:
      type: object
      required:
        - title
        - author
        - publishedYear
      properties:
        title:
          type: string
        author:
          type: string
        publishedYear:
          type: integer

    User:
      type: object
      properties:
        id:
          type: string
        username:
          type: string
        email:
          type: string
    UserInput:
      type: object
      required:
        - username
        - email
        - password
      properties:
        username:
          type: string
        email:
          type: string
        password:
          type: string
          format: password

    AuthRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
        password:
          type: string
          format: password

    AuthResponse:
      type: object
      properties:
        token:
          type: string
```