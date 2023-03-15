# ExpressJS REST API with Sequelize and Jest Testing

This is a sample project for creating a REST API using ExpressJS and Sequelize ORM, along with Jest testing framework.

## Prerequisites
- Node.js installed on your pc
- MySQL database installed and running
 
## Getting Started
1. Clone this repository:
``` 
https://github.com/MuliaHartawan/backend-test-pt-dans-multi-pro.git
```
2. Install dependencies:
```
npm install
```
3. Configure your database credentials in `config/config.json` file.
4. Run migration to create the database schema:
```
npx sequelize db:migrate
```
5. Start the application:
```
npm run start
```
6. Open http://localhost:3000 in your browser or API client to verify the application is running.

## Available Routes
- **POST** `/users/login` - Login user
- **POST** `/users/register` - Register new user
- **PUT** `/users` - Update a user
- **GET** `/users` - Retrieve a single user
- **GET** `/jobs` - Retrieve all jobs
- **POST** `/jobs` - Create a new job
- **GET** `/jobs/:id` - Retrieve a single job by ID
- **PUT** `/jobs/:id` - Update a job by ID
- **DELETE** `/jobs/:id` - DELETE  a job by ID
- **GET** `/companies` - Retrieve all companies
- **POST** `/companies` - Create a new company
- **GET** `/companies/:id` - Retrieve a single company by ID
- **PUT** `/companies/:id` - Update a company by ID
- **DELETE** `/companies/:id` - DELETE  a company by ID

## Testing
```
npm run test
```

## Dependencies
- [Express.js](https://expressjs.com/) - Web application framework
- [Sequelize](https://sequelize.org/) - Object-Relational Mapping (ORM) library for Node.js
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL driver for Node.js
- [Jest](https://jestjs.io/) - Testing framework

## License
This project is licensed under the MIT License.