# Task Manager Web Application

A production-ready full-stack MERN task manager with JWT authentication, secure password hashing, protected task APIs, and a responsive React dashboard styled with Tailwind CSS.

## 1. Project Structure

```text
task-manager-web-application/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/
│   │   │   ├── Task.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── AuthShell.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## 2. Backend Implementation

### Architecture

- Express API structured with MVC-style folders: `controllers`, `routes`, `models`, `middleware`
- MongoDB integration through Mongoose
- Authentication with `bcryptjs` for hashing and `jsonwebtoken` for JWT issuance
- Centralized error handling and JWT protection middleware

### Available API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a JWT
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### User Schema

```js
{
  name: String,
  email: String,
  password: String
}
```

### Task Schema

```js
{
  title: String,
  description: String,
  status: "pending" | "in-progress" | "completed",
  userId: ObjectId
}
```

### Backend Environment Variables

Create `backend/.env` using the template below:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Run Backend

```bash
cd backend
npm install
npm run dev
```

## 3. Frontend Implementation

### Features Included

- React with functional components and hooks
- React Router protected routes
- Axios-based API integration
- JWT and user details stored in `localStorage`
- Create, edit, delete, and complete task workflows
- Loading states, error feedback, and success messages
- Responsive Tailwind CSS UI

### Frontend Environment Variables

Create `frontend/.env` using the template below:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## 4. Local Development Setup

### Install both apps

From the project root:

```bash
npm run install:all
```

### Start applications

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

## 5. Deployment Steps

### MongoDB Atlas Setup

1. Create a free cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and password.
3. In Network Access, allow your deployment platform IP or temporarily allow `0.0.0.0/0`.
4. Copy the connection string and place it in `MONGODB_URI`.
5. Create a database named `task-manager` or use the one in your connection string.

### Deploy Backend on Render

1. Push the repository to GitHub.
2. In Render, create a new `Web Service`.
3. Select the repository and choose the `backend` folder as the root directory.
4. Set:
   - Build command: `npm install`
   - Start command: `npm start`
5. Add environment variables:
   - `PORT=5000`
   - `MONGODB_URI=your_atlas_connection_string`
   - `JWT_SECRET=your_long_random_secret`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`
   - `NODE_ENV=production`
6. Deploy and copy the live backend URL.

### Deploy Backend on Railway

1. Create a new project in Railway.
2. Connect your GitHub repository.
3. Set the service root directory to `backend`.
4. Add the same environment variables listed above.
5. Railway will use `npm start` from `backend/package.json`.

### Deploy Frontend on Vercel

1. Import the repository into Vercel.
2. Set the root directory to `frontend`.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy. The included `vercel.json` handles SPA route rewrites.

### Deploy Frontend on Netlify

1. Import the repository into Netlify.
2. Set the base directory to `frontend`.
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
6. Deploy. The included `public/_redirects` handles SPA route fallback.

## 6. Production Notes

- Use a strong `JWT_SECRET` generated from a password manager or secure random generator.
- Update `CLIENT_URL` on the backend to match the deployed frontend domain.
- Never commit `.env` files to GitHub.
- Use HTTPS-only deployment platforms for both frontend and backend.
- Consider adding rate limiting, request validation, and test coverage as the next production hardening step.

## 7. Brief Section-by-Section Explanation

- `backend/src/controllers` contains the business logic for auth and task actions.
- `backend/src/routes` maps Express endpoints to controllers.
- `backend/src/models` defines MongoDB document structure.
- `backend/src/middleware` handles JWT verification and centralized errors.
- `frontend/src/context/AuthContext.jsx` keeps authentication state available across the app.
- `frontend/src/components` contains reusable UI pieces like protected routes, task cards, and forms.
- `frontend/src/pages` contains the login, signup, and dashboard screens.

## 8. Recommended Next Enhancements

- Add input validation with `express-validator` or `zod`
- Add automated tests for API and UI
- Add filtering, search, and pagination for larger task lists
- Add refresh token support or httpOnly cookie auth if you want stronger session handling
