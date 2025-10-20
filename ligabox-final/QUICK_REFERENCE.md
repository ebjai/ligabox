# Liga de Boxeo API - Quick Reference Card

## 🚀 Commands

```bash
npm install              # Install dependencies
npm run seed             # Populate database
npm run server           # Start API server (dev mode with watch)
npm run server:prod      # Start in production mode
npm run validate         # Validate API structure
```

## 🔗 Base URL

```
http://localhost:3000/api/v1
```

## 🔑 Default Credentials

```
Email: admin@ligadeboxeo.com
Password: admin123
```

## 📡 Quick Endpoint Reference

### Auth
```bash
POST /auth/login              # Login
POST /auth/logout             # Logout
```

### Fighters
```bash
GET  /fighters                # List all
GET  /fighters/with-photos    # List with photos
GET  /fighters/:slug          # Get single
```

### Events
```bash
GET  /events                  # List all
GET  /events/:slug            # Get single
```

### Fights
```bash
GET  /fights/:id              # Get single
POST /admin/fights/:id/result # Update result (admin)
```

### Rankings
```bash
GET  /rankings                # All weight classes
GET  /rankings/:weightClass   # Specific class
```

### Articles
```bash
GET  /articles                # List all
GET  /articles/:slug          # Get single
```

## 🔐 Authentication Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📄 Request Examples

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

### Protected Request
```bash
curl -X POST http://localhost:3000/api/v1/admin/fights/FIGHT_ID/result \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"winnerId":"FIGHTER_ID","method":"KO","finalRound":3}'
```

## 🔌 Socket.IO

### Connect
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/live-chat', {
  query: { eventId: 'championship-night-2025' }
});
```

### Send Message
```javascript
socket.emit('new_message', { message: 'Great fight!' });
```

### Receive Messages
```javascript
socket.on('message_broadcast', (data) => {
  console.log(data);
});
```

## ⚡ Query Parameters

### Pagination
```
?page=1&limit=10
```

### Filtering
```
?status=active
?weightClass=heavyweight
?withPhotos=true
```

## 📊 Response Format

### Success
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

### Error
```json
{
  "error": "Error Type",
  "message": "Description",
  "statusCode": 400
}
```

## 🛡️ Rate Limits

| Type | Limit |
|------|-------|
| Standard | 100/min |
| Admin | 20/min |
| Chat | 50/min |

## 🐛 Troubleshooting

### MongoDB not connected
```bash
brew services start mongodb-community
# or
docker run -d -p 27017:27017 --name mongodb mongo
```

### Port in use
```bash
lsof -ti:3000 | xargs kill
```

### Reset database
```bash
mongosh ligabox
db.dropDatabase()
exit
npm run seed
```

## 📚 Documentation Files

- `API_DOCUMENTATION.md` - Full API reference
- `README_API.md` - Getting started
- `ARCHITECTURE.md` - System design
- `TROUBLESHOOTING.md` - Problem solutions
- `IMPLEMENTATION_SUMMARY.md` - Compliance checklist

## 🧪 Test Files

- `tests/api-tests.http` - HTTP requests
- `tests/socket-client-example.ts` - Socket.IO example
- `scripts/validate-api.ts` - Validation script

## ⚙️ Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ligabox
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 📦 Database Models

- User → email, password, role
- Fighter → name, stats, media
- WeightClass → name, weight
- Fight → fighters, result
- Event → name, date, fights
- Article → title, content, tags

## 🎯 HTTP Status Codes

- 200 → Success
- 400 → Bad Request
- 401 → Unauthorized
- 403 → Forbidden
- 404 → Not Found
- 429 → Rate Limit Exceeded
- 500 → Server Error

---

**Quick Tip**: Use `tests/api-tests.http` with VS Code REST Client for easy testing!

**Pro Tip**: Run `npm run validate` to check if everything is set up correctly.

---

Print this card for quick reference while developing!
