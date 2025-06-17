# Express.js Product API

## Overview

This is a fully functional RESTful API built with Express.js. It is designed to manage a collection of products using standard HTTP methods and includes robust middleware for authentication, validation, request logging, and error handling. It also supports advanced features like pagination, filtering, search, and statistical reporting.

## Features

- RESTful API for product resource management
- CRUD operations (Create, Read, Update, Delete)
- In-memory data store for simplicity
- Middleware for:
  - Logging incoming requests
  - JSON body parsing
  - API key authentication
  - Validation of incoming data
- Global error handling
- Query parameters for filtering and searching
- Pagination for product listings
- Statistical route for insights

## Technologies Used

- Node.js
- Express.js
- UUID (for unique product identifiers)
- Body-parser

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/product-api.git
   cd product-api
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. The server will be running at:

   ```
   http://localhost:3000
   ```

## API Reference

### Authentication

All routes that modify data require an API key.

Add the following header to requests:

```
x-api-key: my-secret-key
```

### Routes

#### Public

| Method | Endpoint              | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| GET    | `/api/products`       | Retrieve all products                        |
| GET    | `/api/products/:id`   | Retrieve a product by its ID                 |
| GET    | `/api/products/stats` | Retrieve statistics (e.g. count by category) |

**Query Parameters (optional):**

* `category`: Filter products by category
* `search`: Search by product name
* `page`: Page number for pagination
* `limit`: Number of results per page

#### Protected (Requires API Key)

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/products`     | Create a new product       |
| PUT    | `/api/products/:id` | Update an existing product |
| DELETE | `/api/products/:id` | Delete a product           |

### Sample Request Body

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic mouse with USB receiver",
  "price": 25.99,
  "category": "electronics",
  "inStock": true
}
```

## Error Handling

Errors are handled globally and return structured JSON responses with appropriate HTTP status codes. Custom error classes are used to distinguish between types of errors (e.g., validation errors, not found errors).

## Learning Objectives

* Understand how to structure a RESTful API using Express.js
* Apply middleware for authentication, logging, and validation
* Implement reusable error-handling logic
* Work with query parameters for filtering and pagination
* Simulate API behavior with an in-memory data store

## License

This project is open source and available under the MIT License.

```
