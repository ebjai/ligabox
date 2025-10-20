# Liga de Boxeo API - Troubleshooting Guide

## Common Issues and Solutions

### 🔴 MongoDB Connection Issues

#### Error: "MongoServerError: connect ECONNREFUSED"
**Cause**: MongoDB is not running or connection string is incorrect.

**Solutions**:
1. Check if MongoDB is running:
   ```bash
   # macOS
   brew services list | grep mongodb
   
   # Linux
   systemctl status mongod
   
   # Check process
   ps aux | grep mongod
   ```

2. Start MongoDB:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. Verify connection string in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ligabox
   ```

#### Error: "Authentication failed"
**Cause**: MongoDB requires authentication but credentials not provided.

**Solution**: Update `.env` with credentials:
```env
MONGODB_URI=mongodb://username:password@localhost:27017/ligabox?authSource=admin
```

---

### 🔴 Port Already in Use

#### Error: "EADDRINUSE: address already in use :::3000"
**Cause**: Another process is using port 3000.

**Solutions**:
1. Find and kill the process:
   ```bash
   # Find process
   lsof -ti:3000
   
   # Kill process
   lsof -ti:3000 | xargs kill
   
   # Or force kill
   lsof -ti:3000 | xargs kill -9
   ```

2. Use a different port in `.env`:
   ```env
   PORT=3001
   ```

---

### 🔴 JWT Authentication Issues

#### Error: "Invalid or expired token"
**Cause**: Token expired, JWT_SECRET mismatch, or malformed token.

**Solutions**:
1. Ensure JWT_SECRET is consistent:
   ```bash
   # Check .env file
   cat .env | grep JWT_SECRET
   ```

2. Login again to get a fresh token:
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@ligadeboxeo.com","password":"admin123"}'
   ```

3. Check token format in requests:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### Error: "Authentication required"
**Cause**: Token not provided or not in correct header.

**Solution**: Include token in header:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/v1/admin/fights/...
```

---

### 🔴 CORS Errors

#### Error: "Access-Control-Allow-Origin"
**Cause**: Request from non-whitelisted origin.

**Solutions**:
1. Add your origin to server config (`server/api/server.ts`):
   ```typescript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'http://localhost:5173',
       'http://localhost:YOUR_PORT', // Add your port
     ],
     credentials: true,
   };
   ```

2. For development, temporarily allow all origins:
   ```typescript
   const corsOptions = {
     origin: '*',
     credentials: true,
   };
   ```
   ⚠️ **Never use in production!**

---

### 🔴 Rate Limiting Issues

#### Error: "Too Many Requests" (429)
**Cause**: Exceeded rate limit.

**Solutions**:
1. Wait for the rate limit window to reset (1 minute).

2. Temporarily increase limits for development (`server/api/server.ts`):
   ```typescript
   const standardLimiter = rateLimit({
     windowMs: 60 * 1000,
     max: 1000, // Increase from 100
   });
   ```

3. Disable rate limiting for specific routes during development:
   ```typescript
   // Comment out rate limiter temporarily
   // app.use('/api/v1', standardLimiter);
   ```

---

### 🔴 Database Seeding Issues

#### Error: "E11000 duplicate key error"
**Cause**: Attempting to seed database that already has data.

**Solutions**:
1. Clear the database first:
   ```bash
   # Connect to MongoDB
   mongosh ligabox
   
   # Drop all collections
   db.users.drop()
   db.fighters.drop()
   db.events.drop()
   db.fights.drop()
   db.articles.drop()
   db.weightclasses.drop()
   
   # Exit
   exit
   ```

2. Run seed again:
   ```bash
   npm run seed
   ```

#### Seed script hangs
**Cause**: Can't connect to MongoDB.

**Solution**: Check MongoDB is running and connection string is correct.

---

### 🔴 Socket.IO Connection Issues

#### Error: "WebSocket connection failed"
**Cause**: Server not running or incorrect namespace.

**Solutions**:
1. Ensure server is running:
   ```bash
   npm run server
   ```

2. Check namespace in client code:
   ```javascript
   const socket = io('http://localhost:3000/live-chat', {
     query: { eventId: 'some-event-id' }
   });
   ```

3. Verify Socket.IO is accessible:
   ```bash
   curl http://localhost:3000/socket.io/
   ```

#### Messages not broadcasting
**Cause**: Not joined to event room or incorrect event ID.

**Solution**: Ensure eventId is provided in connection:
```javascript
const socket = io('http://localhost:3000/live-chat', {
  query: { eventId: 'championship-night-2025' } // Must match event in DB
});
```

---

### 🔴 TypeScript Compilation Errors

#### Error: "Cannot find module"
**Cause**: Missing type definitions or incorrect imports.

**Solutions**:
1. Install missing types:
   ```bash
   npm install --save-dev @types/node @types/express
   ```

2. Check import paths are correct:
   ```typescript
   // Correct
   import User from '../models/User';
   
   // Incorrect
   import User from './models/User'; // Wrong relative path
   ```

3. Clear TypeScript cache:
   ```bash
   rm -rf node_modules/.cache
   rm tsconfig.tsbuildinfo
   ```

---

### 🔴 Environment Variables Not Loading

#### Error: Process.env variables are undefined
**Cause**: `.env` file not loaded or in wrong location.

**Solutions**:
1. Ensure `.env` file exists in project root:
   ```bash
   ls -la .env
   ```

2. Check dotenv is imported at top of server file:
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

3. Verify `.env` format (no spaces around `=`):
   ```env
   # Correct
   PORT=3000
   
   # Incorrect
   PORT = 3000
   ```

---

### 🔴 API Returns Empty Data

#### Issue: GET requests return empty arrays
**Cause**: Database not seeded or collection names mismatch.

**Solutions**:
1. Seed the database:
   ```bash
   npm run seed
   ```

2. Verify data in MongoDB:
   ```bash
   mongosh ligabox
   db.fighters.countDocuments()
   db.events.countDocuments()
   ```

3. Check model names match collection names.

---

### 🔴 Password Not Working

#### Issue: Can't login with seeded admin credentials
**Cause**: Password not hashed correctly or database not seeded.

**Solutions**:
1. Re-seed database:
   ```bash
   npm run seed
   ```

2. Use exact credentials from seed script:
   ```
   Email: admin@ligadeboxeo.com
   Password: admin123
   ```

3. Check bcrypt is working:
   ```typescript
   const bcrypt = require('bcryptjs');
   const hash = bcrypt.hashSync('admin123', 10);
   const match = bcrypt.compareSync('admin123', hash);
   console.log(match); // Should be true
   ```

---

### 🔴 Pagination Not Working

#### Issue: Always returns same page or all results
**Cause**: Query parameters not parsed correctly.

**Solutions**:
1. Ensure query params are numbers:
   ```typescript
   const limitNum = parseInt(limit as string, 10);
   const pageNum = parseInt(page as string, 10);
   ```

2. Use correct query format:
   ```bash
   # Correct
   curl "http://localhost:3000/api/v1/fighters?page=2&limit=5"
   
   # Incorrect
   curl "http://localhost:3000/api/v1/fighters?page='2'&limit='5'"
   ```

---

### 🔴 Server Crashes on Request

#### Error: "TypeError: Cannot read property 'X' of undefined"
**Cause**: Missing data or incorrect population.

**Solutions**:
1. Add null checks:
   ```typescript
   if (!user) {
     return res.status(404).json({ error: 'Not Found' });
   }
   ```

2. Check populate paths exist:
   ```typescript
   await Fighter.findOne({ slug })
     .populate('weightClass') // Ensure this path exists
     .lean();
   ```

3. Enable detailed error logging:
   ```typescript
   console.error('Error details:', err);
   ```

---

## Debugging Tips

### Enable Verbose Logging
Add to `server/api/server.ts`:
```typescript
// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query, req.body);
  next();
});
```

### Test Individual Endpoints
Use the provided test files:
```bash
# VS Code REST Client
# Open tests/api-tests.http and click "Send Request"

# Or use curl
curl -v http://localhost:3000/api/v1/fighters
```

### Verify Database State
```bash
mongosh ligabox
db.fighters.find().pretty()
db.users.find().pretty()
```

### Check Server Logs
The server outputs useful information:
```
MongoDB connected successfully
Server running on port 3000
API available at http://localhost:3000/api/v1
Socket.IO available at http://localhost:3000/live-chat
```

---

## Performance Issues

### API Responding Slowly
**Solutions**:
1. Add database indexes (already included in models)
2. Limit result sizes with pagination
3. Use `.lean()` for read-only queries
4. Add caching layer (Redis)

### Too Many Database Queries
**Solution**: Use populate wisely and consider aggregation pipelines.

---

## Getting Help

### Run Validation Script
```bash
npm run validate
```

### Check Documentation
- `API_DOCUMENTATION.md` - Full API reference
- `README_API.md` - Quick start guide
- `ARCHITECTURE.md` - System architecture

### Test with Sample Requests
All endpoints have examples in `tests/api-tests.http`

---

## Clean Slate (Nuclear Option)

If nothing works, start fresh:

```bash
# Stop server
# Kill MongoDB
brew services stop mongodb-community

# Remove database
rm -rf /usr/local/var/mongodb/*

# Start MongoDB
brew services start mongodb-community

# Clear node modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Reseed
npm run seed

# Start server
npm run server
```

---

**Need more help?**  
Check the issue tracker or review the implementation files for inline comments.
