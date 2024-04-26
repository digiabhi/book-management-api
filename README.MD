## Book Management REST API

This project provides a RESTful API for managing book entries, built with Node.js and Express. It offers user authentication with JSON Web Tokens (JWT) and CRUD (Create, Read, Update, Delete) operations for book data. Additionally, you can filter books by author or publication year.

**Features:**

- User authentication with JWT
- CRUD operations for book management
- Book filtering by author or publication year
- Input validation with middleware
- Rate limiting for security
- API documentation at `localhost:your-port/api-docs` (replace `your-port` with the actual port number)

**Setup:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/digiabhi/book-management-api.git
   ```

2. **Install dependencies by running:**

   ```bash
   cd book-management-api
   npm i
   ```

3. **Database Configuration:**

- Navigate to the `src/config` folder and modify the `config.json` file:
- Change the `username` and `password` fields under the `development` key to match your MySQL username and password.
- Update the `database` field to specify the name of the database you want to create.

4. **Database Seeding:**

- Run the following commands to create the database, migrate tables, and seed demo data:

```bash
cd src/
npx sequelize-cli db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

5. **Start Service:**

```
npm start
```

- The service will be up and running on the port specified in the `.env` file.
- Now you can go to the documentation and run APIs based on your requirement.
