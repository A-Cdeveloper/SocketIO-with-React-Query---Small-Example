# SocketIO with React Query - Small Example

A full-stack application demonstrating real-time communication using Socket.IO with React Query for state management.

## 🚀 Features

- **REST API** with Express.js and TypeScript
- **JWT Authentication** with refresh token support for secure endpoints
- **Auto-refresh token** mechanism for seamless authentication
- **React Query** with infinite scroll pagination for efficient data fetching
- **React Hook Form** with Zod validation for forms
- **Shared TypeScript types** between client and server
- **Complete CRUD operations** for car management
- **Socket.IO** for real-time bidirectional communication with automatic UI updates
- **Dark mode** support with Tailwind CSS
- **Responsive design** with mobile burger menu
- **React Router** with lazy loading for optimized performance
- **Zustand** for state management with persistence
- **Vitest** + **React Testing Library** for comprehensive unit testing
- **Performance optimization** with code splitting and tree shaking
- **Accessibility (ARIA)** support for screen readers
- **Custom hooks** for infinite scroll, theme management, and Socket.IO

## 📁 Project Structure

```
SocketIO-with-React-Query-Small-Example/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── customComponents/  # Custom form components
│   │   │   ├── layout/            # Layout components (Header, Nav, etc.)
│   │   │   └── ui/                # shadcn/ui components
│   │   ├── features/       # Feature-based architecture
│   │   │   ├── auth/       # Authentication feature
│   │   │   └── cars/       # Cars feature (CRUD)
│   │   ├── hooks/          # Custom React hooks (useSocket, useTheme, etc.)
│   │   ├── lib/            # Utilities (apiClient, env, utils)
│   │   ├── pages/          # Page components
│   │   ├── providers/      # React Query, Router, Socket setup
│   │   └── store/          # Zustand state management
│   └── package.json
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── routes/         # API routes (auth, cars)
│   │   ├── middleware/     # Auth middleware
│   │   └── server.ts       # Main server file
│   ├── data.json           # Cars data (50 cars)
│   ├── users.json          # User authentication data
│   ├── .env                # Environment variables
│   └── package.json
├── shared/                 # Shared TypeScript types
│   └── types/
│       ├── car.ts          # Car-related types
│       ├── user.ts         # User/auth types
│       └── index.ts        # Exports
└── README.md
```

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express.js**
- **TypeScript**
- **JWT** authentication with refresh tokens
- **bcryptjs** for password hashing
- **dotenv** for environment variables (dev & prod support)
- **Socket.IO** for real-time WebSocket communication

### Frontend

- **React 19** + **Vite**
- **TypeScript**
- **TanStack Query** (React Query) v5 - infinite queries
- **React Hook Form** with Zod validation
- **React Router DOM** v7 for client-side routing
- **Zustand** with persist middleware for state management
- **Tailwind CSS** with dark mode support
- **shadcn/ui** - modern component library
- **Lucide React** for icons
- **next-themes** for theme switching
- **Sonner** for toast notifications
- **socket.io-client** for WebSocket client connection

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

- `POST /api/auth/login` - User login (returns access & refresh tokens)
- `POST /api/auth/refresh` - Refresh access token

### Cars (Public)

- `GET /api/cars` - Get all cars with pagination (query: page, limit)
- `GET /api/cars/:id` - Get car by ID

### Cars (Protected - requires JWT token)

- `POST /api/cars` - Create new car (emits `car:added` Socket.IO event)
- `PUT /api/cars/:id` - Update car (emits `car:updated` Socket.IO event)
- `DELETE /api/cars/:id` - Delete car (emits `car:deleted` Socket.IO event)

## 🔐 Authentication

### JWT Token System

- **Access Token**: 15 minutes expiration, used for API calls
- **Refresh Token**: 7 days expiration, used to get new access tokens
- **Auto-refresh**: Automatically refreshes access token on 403 errors

### Test Users

- **Admin:** `aleksandar@e-seo.info` / `password`
- **User:** `user@example.com` / `password`

Both users have the password: `password`

### Using the API

```
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"aleksandar@e-seo.info","password":"password"}'

# Response: { "user": {...}, "token": "access_token", "refreshToken": "refresh_token" }

# Use access token in protected endpoints
curl -X POST http://localhost:3001/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"car_name":"Tesla Model S","brand":"Tesla","price":80000,"description":"Electric luxury sedan"}'

# Refresh access token when expired
curl -X POST http://localhost:3001/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

## 🎯 Current Status

### ✅ Completed

#### Backend

- REST API with Express.js and TypeScript
- JWT Authentication with refresh tokens
- CRUD operations for cars with pagination
- Environment-based configuration (.env for dev, .env.production for prod)
- bcryptjs password hashing
- Data management with JSON files

#### Frontend

- React 19 + Vite setup
- TanStack Query v5 with infinite scroll pagination
- React Hook Form with Zod validation
- React Router v7 with lazy loading for performance
- Zustand with persist for state management
- Complete authentication system (login, logout, auto-refresh)
- Dark mode with Tailwind CSS and next-themes
- Responsive design with mobile burger menu
- shadcn/ui modern component library
- Infinite scroll for car listings
- Complete CRUD interface for cars
- Error boundaries and error handling
- Custom hooks (useTheme, useInfiniteScroll, useSocket, useOutsideClick)
- Form validation with React Hook Form + Zod
- Socket.IO real-time updates with React Query cache invalidation
- Auto-sync UI when cars are added, edited, or deleted via Socket.IO
- **Unit testing** with Vitest and React Testing Library (28 tests)
- **Performance optimization** with code splitting and tree shaking
- **Accessibility (ARIA)** support for screen readers

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
npm run test     # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run lint     # Run ESLint
```

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library.

### Test Structure

- **Hook tests**: `useTheme`, `useOutsideClick`, `useLogin`, `useCar`, `useEditCar`, `useDeleteCar`
- **Component tests**: `EmptyResults`, `ErrorResults`, `CarListItem`, `AllCars`, `CarFormular`
- **Utility tests**: `priceFormat`

### Running Tests

```
cd client
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Test Coverage

- 28 tests passing
- All critical hooks and components tested
- Mock setup for API calls and external dependencies

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 🔌 Socket.IO Real-Time Events

The application emits Socket.IO events for all CRUD operations:

- **car:added** - Emitted when a new car is created
- **car:updated** - Emitted when a car is updated
- **car:deleted** - Emitted when a car is deleted

All connected clients automatically receive these events and update their UI in real-time using React Query's cache invalidation and refetching mechanism.

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
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-change-in-production
```

**Note**: For production, create `server/.env.production` with secure keys.

**Create** `**client/.env**` **file:**

```
VITE_REST_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
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
