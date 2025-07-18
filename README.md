# 📋 Task Manager API

A simple and secure RESTful API for managing personal tasks. Built with **Node.js**, **Express**, and **MongoDB**, this backend allows users to register, log in, and perform full CRUD operations on their own task lists, including uploading attachments.

---

## 🚀 Features

- User registration & login with JWT authentication
- Secure route access via middleware
- Create, read, update, delete personal tasks
- File upload support (task attachments)
- Organized project structure with MVC pattern

---

## 🛠️ Tech Stack

- Node.js + Express  
- MongoDB + Mongoose  
- JWT for authentication  
- Multer for file uploads  
- Dotenv, Bcrypt, CORS, etc.

---

## 📂 Project Structure

task-manager-api/
├── controllers/
├── routes/
├── models/
├── middleware/
├── uploads/
├── .env
├── .gitignore
├── app.js
├── package.json

---

##  Installation

```bash
git clone https://github.com/saudmohd/taskmanager-api.git
cd taskmanager-api
npm install
## Run the server
node app.js
# or use nodemon
npx nodemon app.js

Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

API Endpoints
🔑 Auth Routes
| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | /auth/register | Register new user     |
| POST   | /auth/login    | Login & get JWT token |

Task Routes (Protected)
All routes below require Authorization: Bearer <token>
 | Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| GET    | /tasks                 | Get all tasks for user   |
| POST   | /tasks                 | Create a new task        |
| GET    | /tasks/\:id            | Get task by ID           |
| PUT    | /tasks/\:id            | Update task by ID        |
| DELETE | /tasks/\:id            | Delete task by ID        |
| POST   | /tasks/\:id/attachment | Upload file for the task |


File Upload Notes
Uploads saved in uploads/ directory

Attach images, PDFs, etc.

Multer handles file parsing
 
Sample Task JSON
{
  "title": "Finish API project",
  "description": "Complete the backend task manager with all features",
  "status": "pending",
  "dueDate": "2025-07-20"
}


Author
Saud Mohd

