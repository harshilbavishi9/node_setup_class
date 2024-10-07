# TypeORM Project

## Description

This project is a Node.js application built using TypeScript, Express, TypeORM, and Redis. It provides a basic user management API with CRUD operations and utilizes Redis for caching.

## Features

- User registration
- User authentication
- CRUD operations for users
- Caching with Redis
- Input validation with express-validator
- Environment variable management with dotenv
- Logging with morgan
- Email sending with Nodemailer

## Technologies Used

- **Node.js**: JavaScript runtime
- **TypeScript**: Superset of JavaScript
- **Express**: Web framework for Node.js
- **TypeORM**: ORM for TypeScript and JavaScript
- **PostgreSQL**: Database
- **Redis**: In-memory data structure store for caching
- **Nodemailer**: Email sending library

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.x or higher)
- PostgreSQL
- Redis

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd your-project-name
   ```

2. Env:

   ```bash
   PORT=<your-port>
   DB_TYPE=<database-type>
   DB_HOST=<database-host>
   DB_PORT=<database-port>
   DB_USER=<database-user>
   DB_PASS=<database-password>
   DB_NAME=<database-name>
   JWT_EXPIRES_IN=<jwt-expiration-time>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
   SMTP_HOST=<smtp-host>
   SMTP_PORT=<smtp-port>
   SMTP_USER=<smtp-user>
   SMTP_PASS=<smtp-password>
   BASE_URL=<base-url>
   REDIS_URL=<redis-url>
   ```
