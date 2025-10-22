# SocketIO with React Query - Small Example

A full-stack application demonstrating real-time communication using Socket.IO with React Query for state management.

## 🚀 Features

- **REST API** with Express.js and TypeScript
- **JWT Authentication** for secure endpoints
- **Real-time updates** with Socket.IO (coming soon)
- **React Query** for efficient data fetching
- **Shared TypeScript types** between client and server
- **CRUD operations** for car management

## 📁 Project Structure

```
SocketIO-with-React-Query-Small-Example/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── providers/      # React Query setup
│   │   └── ...
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/         # Data management
│   │   └── ...
│   ├── data.json          # Cars data
│   └── users.json         # Users data
├── shared/                 # Shared TypeScript types
│   └── types/
│       ├── car.ts
│       ├── user.ts
│       └── index.ts
└── README.md
```

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express.js**
- **TypeScript**
- **JWT** authentication
- **bcryptjs** for password hashing
- **Socket.IO** (coming soon)
- **dotenv** for environment variables

### Frontend

- **React** + **Vite**
- **TypeScript**
- **TanStack Query** (React Query)
- **Tailwind CSS**
- **shadcn/ui** components
- **Socket.IO Client** (coming soon)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

**Clone the repository**

**Install server dependencies**

**Install client dependencies**

**Set up environment variables**

Create `server/.env` file:

**Start the development servers**

**Terminal 1 - Start server:**

**Terminal 2 - Start client:**

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` - User login

### Cars (Public)

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID

### Cars (Protected - requires JWT token)

- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

## 🔐 Authentication

### Test Users

- **Admin:** `admin@example.com` / `password`
- **User:** `user@example.com` / `password`

### Using the API

```
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Use token in protected endpoints
curl -X POST http://localhost:3001/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"car_name":"Tesla Model S","brand":"Tesla","price":80000}'
```

## 🎯 Current Status

### ✅ Completed

- REST API with Express.js
- JWT Authentication system
- CRUD operations for cars
- TypeScript setup with shared types
- React + Vite frontend setup
- TanStack Query integration
- UI components with shadcn/ui

### 🚧 Coming Soon

- Socket.IO real-time updates
- Client-side authentication
- Car management UI
- Real-time car updates across clients

## 🛠️ Development

### Server Scripts

```
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
```

### Client Scripts

```
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Note:** This is a small example project demonstrating Socket.IO integration with React Query. Perfect for learning real-time web development! 🚀

```
cd client
npm run dev
```

```
cd server
npm run dev
```

```
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:5173
```

```
cd ../client
npm install
```

```
cd server
npm install
```

```
git clone <repository-url>
cd SocketIO-with-React-Query-Small-Example
```
