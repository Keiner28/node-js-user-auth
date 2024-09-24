# Authentication Project with JWT and Express.js

This project is a web application built with Express.js that includes user authentication using **JSON Web Tokens (JWT)**. The application uses **EJS** as the view engine to render login, registration, and other protected pages.

## Features

- **JWT Authentication**: Users can register and log in using JWT to protect private routes.
- **Dynamic Views with EJS**: Pages are dynamically rendered using EJS, with a template system.
- **Environment Variables**: Sensitive configurations like server port, secret keys, and other parameters are managed via a `.env` file.
- **Route Protection**: Protected routes can only be accessed by authenticated users.

## Technologies Used

- **Node.js** and **Express.js**
- **EJS** for views
- **JWT** for authentication
- **dotenv** for environment variable management
- **bcrypt** for password hashing
- **db-local** (local storage, can be replaced by any database)

## Requirements

- **Node.js** (version >= 18)
- **npm** or **pnpm**
- A `.env` file with the following variables:

```plaintext
    PORT=3000
    SALT_ROUNDS=10
    SECRET_JWT_KEY=yourSecretKey
```

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root of the project with the following environment variables:

   ```plaintext
   PORT=3000
   SALT_ROUNDS=10
   SECRET_JWT_KEY=yourSecretKey
   ```

4. Run the application:

   ```bash
   pnpm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

```
.
├── public                  # Static files (CSS, JS)
├── src
│   ├── controllers         # Application controllers
│   ├── views               # EJS views
│   ├── routes              # Route definitions
│   ├── user-repository.js  # Database logic
│   ├── config.js           # Project configuration
│   └── app.js              # Main server configuration
├── .env                    # Environment variables file
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Main Routes

- **`/register`** - Registration page.
- **`/login`** - Login page.
- **`/protected`** - Protected page, only accessible by authenticated users.

## Available Scripts

- **`pnpm run dev`**: Starts the server in development mode with automatic restarts.

## Contributing

If you would like to contribute to this project, you can fork it and create a pull request with your changes. Make sure to follow best development practices.
