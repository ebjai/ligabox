# Liga de Boxeo - REST API

Complete implementation of the Liga de Boxeo REST API according to the official specification v1.0.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 4.4+ (running locally or remote connection)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd ligabox-final
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ligabox
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

3. **Start MongoDB:**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   
   # Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```
   
   This creates:
   - Admin user: `admin@ligadeboxeo.com` / `admin123`
   - Sample fighters, events, fights, and articles
   - Weight classes

5. **Start the API server:**
   ```bash
   npm run server
   ```
   
   The server will start on http://localhost:3000

## 📋 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Login with email/password | No |
| POST | `/auth/logout` | Logout and clear cookie | No |

### Fighters

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/fighters` | Get all fighters (with pagination) | No |
| GET | `/fighters/with-photos` | Get fighters with photos only | No |
| GET | `/fighters/:slug` | Get single fighter by slug | No |

### Events

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | Get all events (with pagination) | No |
| GET | `/events/:slug` | Get single event by slug | No |

### Fights

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/fights/:id` | Get single fight by ID | No |
| POST | `/admin/fights/:id/result` | Update fight result | Yes (Admin) |

### Rankings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/rankings` | Get all weight class rankings | No |
| GET | `/rankings/:weightClass` | Get specific weight class rankings | No |

### Articles

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/articles` | Get all articles (with pagination) | No |
| GET | `/articles/:slug` | Get single article by slug | No |

## 🔌 Socket.IO Real-Time Chat

### Namespace
```
/live-chat
```

### Connection Example
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/live-chat', {
  query: { eventId: 'event-id-here' }
});

// Send message
socket.emit('new_message', { message: 'Great fight!' });

// Receive messages
socket.on('message_broadcast', (data) => {
  console.log(data);
});
```

### Events

**Client → Server:**
- `new_message` - Send a chat message

**Server → Client:**
- `message_broadcast` - Receive chat messages
- `user_joined` - User joined the chat
- `user_left` - User left the chat

## 📝 Example Requests

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ligadeboxeo.com","password":"admin123"}'
```

### Get Fighters
```bash
curl http://localhost:3000/api/v1/fighters?limit=5&page=1
```

### Get Fighter by Slug
```bash
curl http://localhost:3000/api/v1/fighters/juan-gonzalez
```

### Get Events
```bash
curl http://localhost:3000/api/v1/events?status=upcoming
```

### Get Rankings
```bash
curl http://localhost:3000/api/v1/rankings/heavyweight
```

### Update Fight Result (Requires Auth)
```bash
# First login and get token
TOKEN=$(curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ligadeboxeo.com","password":"admin123"}' \
  | jq -r '.token')

# Then use token to update fight
curl -X POST http://localhost:3000/api/v1/admin/fights/FIGHT_ID/result \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"winnerId":"FIGHTER_ID","method":"KO","finalRound":3}'
```

## 🔒 Authentication & Authorization

### JWT Tokens
- Tokens are issued on login
- Valid for 7 days
- Automatically set as httpOnly cookie
- Can also be sent via `Authorization: Bearer <token>` header

### Admin Endpoints
Protected endpoints require:
1. Valid JWT token
2. User role must be `admin`

## ⚡ Rate Limiting

| Endpoint Type | Limit |
|--------------|-------|
| Standard API | 100 requests/minute per IP |
| Admin API | 20 requests/minute per user |
| Chat messages | 50 messages/minute per user |

## 🗄️ Database Models

### User
- Email, password (bcrypt), role (user/admin)

### Fighter
- Personal info, stats, physical attributes, media
- Related to WeightClass

### WeightClass
- Name, weight in pounds

### Fight
- Two fighters, weight class, rounds, result
- Related to Event

### Event
- Name, date, location, status
- Contains multiple Fights

### Article
- Title, content, author, tags
- Status (draft/published)

## 📦 Project Structure

```
ligabox-final/
├── server/
│   ├── api/
│   │   └── server.ts          # Main Express app with Socket.IO
│   ├── config/
│   │   └── database.ts        # MongoDB connection
│   ├── controllers/           # Business logic
│   │   ├── authController.ts
│   │   ├── fightersController.ts
│   │   ├── eventsController.ts
│   │   ├── fightsController.ts
│   │   ├── rankingsController.ts
│   │   └── articlesController.ts
│   ├── middleware/            # Auth, error handling
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/                # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Fighter.ts
│   │   ├── Event.ts
│   │   ├── Fight.ts
│   │   ├── Article.ts
│   │   └── WeightClass.ts
│   ├── routes/                # API routes
│   │   ├── auth.ts
│   │   ├── fighters.ts
│   │   ├── events.ts
│   │   ├── fights.ts
│   │   ├── rankings.ts
│   │   └── articles.ts
│   └── utils/
│       └── seed.ts            # Database seeding
├── tests/
│   ├── api-tests.http         # HTTP test requests
│   └── socket-client-example.ts
├── .env.example
├── API_DOCUMENTATION.md
└── package.json
```

## 🧪 Testing

### Using VS Code REST Client
Open `tests/api-tests.http` and click "Send Request" on any endpoint.

### Using curl
See example requests above.

### Using Postman
Import the endpoints from `tests/api-tests.http` or `API_DOCUMENTATION.md`.

## 🔧 Development

### Start development server with auto-reload:
```bash
npm run server
```

### Reseed database:
```bash
npm run seed
```

### Build for production:
```bash
npm run server:prod
```

## 🌐 CORS Configuration

Allowed origins:
- `https://ligadeboxeo.com`
- `https://www.ligadeboxeo.com`
- `http://localhost:3000`
- `http://localhost:5173`

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

## 📊 Response Format

### Success Response
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Descriptive error message",
  "statusCode": 400
}
```

## 🎯 Key Features

✅ Full REST API implementation per specification  
✅ JWT authentication with httpOnly cookies  
✅ Real-time chat with Socket.IO  
✅ Rate limiting on all endpoints  
✅ CORS configuration  
✅ Pagination support  
✅ Error handling middleware  
✅ MongoDB with Mongoose ODM  
✅ TypeScript for type safety  
✅ Admin role-based authorization  
✅ Database seeding script  

## 📖 Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [tests/api-tests.http](./tests/api-tests.http) - Test requests
- [tests/socket-client-example.ts](./tests/socket-client-example.ts) - Socket.IO example

## 🐛 Troubleshooting

### MongoDB connection error
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB port (default: 27017)

### Port already in use
- Change PORT in .env
- Kill existing process: `lsof -ti:3000 | xargs kill`

### JWT token invalid
- Check JWT_SECRET matches between requests
- Token expires after 7 days

## 📝 License

MIT

## 👥 Support

For issues or questions, please open an issue on GitHub.
