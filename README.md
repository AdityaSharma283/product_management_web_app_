
#  Product Management Web App

A full-stack web application for managing products with secure authentication, CRUD operations, and category-based filtering. Built with **NestJS**, **MongoDB**, and **React.js**.



 Tech Stack

 Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

 Backend
- **NestJS**
- **MongoDB + Mongoose**
- **JWT (JSON Web Token)**


##  Features

-  **User Auth** (Signup / Login with JWT)
-  **Product CRUD**
-  Responsive UI with Tailwind

---

##  Getting Started

### Prerequisites

- Node.js
- MongoDB (running locally or in cloud e.g., Atlas)

---

##  Backend Setup (`NestJS`)

1. Navigate to the backend directory:
   ```bash
   cd backend
Install dependencies:

bash
Copy
Edit
npm install
Run MongoDB locally or update the connection string in app.module.ts:

ts
Copy
Edit
MongooseModule.forRoot('mongodb://localhost/product-app')
Start backend server:

bash
Copy
Edit
npm run start:dev
 Frontend Setup (React)
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start React app:

bash
Copy
Edit
npm run dev


📄 License
MIT License
