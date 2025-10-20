# Liga de Boxeo - API Implementation

This document describes the implemented REST API for Liga de Boxeo.

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB 4.4+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ligabox
JWT_SECRET=your-super-secret-jwt-key
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run server
```

The API will be available at `http://localhost:3000/api/v1`

## API Endpoints

### Base URL
All API endpoints are prefixed with `/api/v1`

### Authentication

#### POST /auth/login
Login with email and password. Returns JWT token and sets httpOnly cookie.

**Request:**
```json
{
  "email": "admin@ligadeboxeo.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@ligadeboxeo.com",
    "role": "admin"
  }
}
```

#### POST /auth/logout
Logout and clear authentication cookie.

### Fighters

#### GET /fighters
Get all fighters with optional filtering and pagination.

**Query Parameters:**
- `weightClass` (optional): Filter by weight class ID
- `status` (optional): 'active', 'inactive', 'champion'
- `limit` (optional, default: 10)
- `page` (optional, default: 1)
- `withPhotos` (optional, default: false)

#### GET /fighters/with-photos
Get fighters with profile images only.

#### GET /fighters/:slug
Get single fighter by slug with fight history.

### Events

#### GET /events
Get all events with optional filtering.

**Query Parameters:**
- `status` (optional): 'upcoming', 'live', 'completed'
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

#### GET /events/:slug
Get single event by slug with full fight details.

### Fights

#### GET /fights/:id
Get single fight by ID.

#### POST /admin/fights/:id/result
Update fight result (Admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "winnerId": "507f1f77bcf86cd799439011",
  "method": "KO",
  "finalRound": 3
}
```

### Rankings

#### GET /rankings
Get rankings for all weight classes.

#### GET /rankings/:weightClass
Get rankings for specific weight class (e.g., "heavyweight").

### Articles

#### GET /articles
Get all articles with optional filtering.

**Query Parameters:**
- `status` (optional): 'draft', 'published'
- `limit` (optional, default: 10)
- `page` (optional, default: 1)

#### GET /articles/:slug
Get single article by slug with related articles.

## Real-Time Chat (Socket.IO)

### Namespace: `/live-chat`

### Connection
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  path: '/socket.io',
});

const chatSocket = socket.of('/live-chat');
chatSocket.connect();
```

### Client Events

**Send Message:**
```javascript
socket.emit('new_message', {
  message: 'Great knockout!'
});
```

### Server Events

**Receive Message:**
```javascript
socket.on('message_broadcast', (data) => {
  console.log(data);
  // { user: 'FanNickname', message: 'Great knockout!', timestamp: '...', userId: '...' }
});
```

**User Joined:**
```javascript
socket.on('user_joined', (data) => {
  console.log(data);
  // { user: 'FanNickname', timestamp: '...', userCount: 1250 }
});
```

**User Left:**
```javascript
socket.on('user_left', (data) => {
  console.log(data);
  // { user: 'FanNickname', timestamp: '...', userCount: 1249 }
});
```

## Rate Limiting

- Standard endpoints: 100 requests/minute per IP
- Admin endpoints: 20 requests/minute per user
- Chat: 50 messages/minute per user

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error Type",
  "message": "Descriptive error message",
  "statusCode": 400
}
```

### Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Security

- JWT tokens for authentication
- httpOnly cookies to prevent XSS
- CORS configured for specific origins
- Rate limiting on all endpoints
- Admin-only endpoints protected with role-based authorization

## Testing

### Default Admin Credentials
After running the seed script:
- Email: `admin@ligadeboxeo.com`
- Password: `admin123`

### Test the API

1. Health check:
```bash
curl http://localhost:3000/api/health
```

2. Get fighters:
```bash
curl http://localhost:3000/api/v1/fighters
```

3. Login:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ligadeboxeo.com","password":"admin123"}'
```

4. Get rankings:
```bash
curl http://localhost:3000/api/v1/rankings
```

## Architecture

```
server/
├── api/
│   └── server.ts          # Main Express app with Socket.IO
├── config/
│   └── database.ts        # MongoDB connection
├── controllers/
│   ├── authController.ts
│   ├── fightersController.ts
│   ├── eventsController.ts
│   ├── fightsController.ts
│   ├── rankingsController.ts
│   └── articlesController.ts
├── middleware/
│   ├── auth.ts           # JWT authentication & authorization
│   └── errorHandler.ts   # Error handling middleware
├── models/
│   ├── User.ts
│   ├── Fighter.ts
│   ├── Event.ts
│   ├── Fight.ts
│   ├── Article.ts
│   └── WeightClass.ts
├── routes/
│   ├── auth.ts
│   ├── fighters.ts
│   ├── events.ts
│   ├── fights.ts
│   ├── rankings.ts
│   └── articles.ts
└── utils/
    └── seed.ts           # Database seeding script
```

## Database Models

### User
- email, password (bcrypt hashed), role (user/admin)

### Fighter
- Personal info (firstName, lastName, nickname, slug)
- Weight class reference
- Status (active, inactive, champion)
- Stats (wins, losses, draws, knockouts)
- Physical (height, reach, stance)
- Media (profileImage, heroImage, gallery)

### WeightClass
- name, weight_lbs

### Fight
- fighters (array of 2 Fighter references)
- weightClass, isTitleFight, rounds
- result (winner, method, finalRound)

### Event
- eventName, slug, date, location
- status (upcoming, live, completed)
- ticketUrl, streamUrl
- fights (array of Fight references)

### Article
- title, slug, author, content
- featuredImage, excerpt, tags
- status (draft, published)
- publishedAt, relatedArticles

## Future Enhancements

- Add user registration endpoint
- Implement fighter image upload
- Add real-time fight scoring
- Implement search functionality
- Add caching layer (Redis)
- Add email notifications
- Implement push notifications
- Add GraphQL API option
