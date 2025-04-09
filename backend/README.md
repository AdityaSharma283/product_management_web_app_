# Product Management API

## Description

This is a REST API for managing products, built with NestJS and MongoDB.

## Installation

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Create a `.env` file with the following variables:

    ```
    DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRES_IN=7d
    ```

4.  Start the development server: `npm run dev`

## Usage

The API documentation can be accessed at `/api` endpoint after the server is running.

## Endpoints

*   `GET /products` - Get all products
*   `POST /products` - Create a new product
*   `GET /products/:id` - Get a product by ID
*   `PUT /products/:id` - Update a product
*   `DELETE /products/:id` - Delete a product
*   `POST /auth/signup` - Register a new user
*   `POST /auth/login` - Login
*   `POST /auth/logout` - Logout

## Authentication

The API uses JWT for authentication. Most endpoints require a valid JWT token in the `Authorization` header.
