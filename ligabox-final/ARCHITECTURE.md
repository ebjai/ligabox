# Liga de Boxeo API - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser  │  Mobile App  │  Socket.IO Client  │  API Client│
└────────┬────────────┬───────────────┬──────────────────┬────────┘
         │            │               │                  │
         └────────────┴───────────────┴──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  CORS  │  Rate Limiting  │  Auth (JWT)  │  Error Handler       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API LAYER (Express)                       │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│              │              │              │                   │
│  Auth Routes │ Fighter      │  Event       │  Fight Routes     │
│              │  Routes      │  Routes      │                   │
│              │              │              │                   │
│  Ranking     │  Article     │  Socket.IO   │                   │
│  Routes      │  Routes      │  Live Chat   │                   │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬────────────┘
       │              │              │              │
       ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                             │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│ authCtrl     │ fightersCtrl │ eventsCtrl   │ fightsCtrl        │
│ - login()    │ - getAll()   │ - getAll()   │ - getSingle()     │
│ - logout()   │ - getSingle()│ - getSingle()│ - updateResult()  │
│              │ - withPhotos()│              │                   │
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ rankingsCtrl │ articlesCtrl │              │                   │
│ - getAll()   │ - getAll()   │              │                   │
│ - getByCls() │ - getSingle()│              │                   │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬────────────┘
       │              │              │              │
       ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MODEL LAYER (Mongoose)                     │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│  User        │  Fighter     │  Event       │  Fight            │
│  - email     │  - name      │  - name      │  - fighters[]     │
│  - password  │  - stats     │  - date      │  - result         │
│  - role      │  - media     │  - fights[]  │  - weightClass    │
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ WeightClass  │  Article     │              │                   │
│  - name      │  - title     │              │                   │
│  - weight    │  - content   │              │                   │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬────────────┘
       │              │              │              │
       └──────────────┴──────────────┴──────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                      MongoDB Database                           │
│  Collections: users, fighters, events, fights, articles,       │
│               weightclasses                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### REST API Request Flow
```
1. Client Request
   ↓
2. CORS Middleware (validate origin)
   ↓
3. Rate Limiting (check request count)
   ↓
4. Route Matching (find endpoint)
   ↓
5. Auth Middleware (if protected route)
   ↓
6. Controller (business logic)
   ↓
7. Model (database query)
   ↓
8. Database (MongoDB)
   ↓
9. Response (JSON with pagination)
   ↓
10. Client
```

### Socket.IO Chat Flow
```
1. Client connects to /live-chat
   ↓
2. Server assigns to event room (via eventId)
   ↓
3. Broadcast 'user_joined' to room
   ↓
4. Client sends 'new_message'
   ↓
5. Server validates rate limit
   ↓
6. Broadcast 'message_broadcast' to all in room
   ↓
7. All clients receive message
```

## Endpoint Mapping

### Authentication Flow
```
POST /api/v1/auth/login
  → authController.login()
    → User.findOne()
    → bcrypt.compare()
    → jwt.sign()
    → res.json({ token, user })

POST /api/v1/auth/logout
  → authController.logout()
    → res.clearCookie()
    → res.json({ message })
```

### Fighter Endpoints
```
GET /api/v1/fighters
  → fightersController.getAllFighters()
    → Fighter.find().populate('weightClass')
    → res.json({ data, pagination })

GET /api/v1/fighters/:slug
  → fightersController.getSingleFighter()
    → Fighter.findOne({ slug }).populate()
    → Fight.find() // get fight history
    → res.json({ fighter, fightHistory })
```

### Protected Endpoint (Admin)
```
POST /api/v1/admin/fights/:id/result
  → authenticate middleware (verify JWT)
  → authorize middleware (check role=admin)
  → fightsController.updateFightResult()
    → Fight.findById()
    → fight.result = { winner, method, round }
    → Fighter.updateStats() // update both fighters
    → res.json({ message, fight })
```

## Data Relationships

```
┌──────────────┐
│ WeightClass  │
│  - name      │◄──────────┐
│  - weight    │            │
└──────────────┘            │
                            │
                      ┌─────┴──────┐
                      │  Fighter   │
                      │  - name    │
                      │  - stats   │◄──────────┐
                      │  - media   │           │
                      └────────────┘           │
                            ▲                  │
                            │                  │
                            │            ┌─────┴──────┐
                      ┌─────┴──────┐     │   Fight    │
                      │   Event    │     │ - fighters │
                      │  - name    │     │ - result   │
                      │  - date    │     └────────────┘
                      │  - fights[]│◄─────────┘
                      └────────────┘

┌──────────────┐
│   Article    │
│  - title     │
│  - content   │
│  - tags[]    │
│  - status    │
└──────────────┘

┌──────────────┐
│     User     │
│  - email     │
│  - password  │
│  - role      │
└──────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────┐
│         Application Security            │
├─────────────────────────────────────────┤
│  1. CORS (Origin Validation)            │
│     ✓ Whitelist specific domains        │
│     ✓ Credentials: true                 │
├─────────────────────────────────────────┤
│  2. Rate Limiting                       │
│     ✓ 100 req/min (standard)           │
│     ✓ 20 req/min (admin)               │
│     ✓ 50 msg/min (chat)                │
├─────────────────────────────────────────┤
│  3. JWT Authentication                  │
│     ✓ Token validation                  │
│     ✓ HttpOnly cookies                  │
│     ✓ 7-day expiration                  │
├─────────────────────────────────────────┤
│  4. Authorization                       │
│     ✓ Role-based access (admin/user)   │
│     ✓ Protected routes                  │
├─────────────────────────────────────────┤
│  5. Password Security                   │
│     ✓ bcrypt hashing (10 rounds)       │
│     ✓ Never stored in plain text        │
├─────────────────────────────────────────┤
│  6. Input Validation                    │
│     ✓ Request body validation           │
│     ✓ Query parameter sanitization      │
├─────────────────────────────────────────┤
│  7. Error Handling                      │
│     ✓ No sensitive info in errors       │
│     ✓ Standardized error format         │
└─────────────────────────────────────────┘
```

## Scalability Considerations

### Current Implementation
- Single Node.js server
- Direct MongoDB connection
- In-memory Socket.IO rooms

### Production Recommendations
```
┌─────────────────────────────────────────┐
│         Load Balancer (nginx)           │
└──────────┬──────────────┬───────────────┘
           │              │
    ┌──────▼──────┐ ┌────▼──────────┐
    │   API       │ │   API         │
    │  Server 1   │ │  Server 2     │
    └──────┬──────┘ └────┬──────────┘
           │              │
           └──────┬───────┘
                  │
         ┌────────▼────────┐
         │  Redis (Cache)  │
         │  & Socket.IO    │
         │  Adapter        │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │  MongoDB        │
         │  Replica Set    │
         └─────────────────┘
```

### Recommended Enhancements
1. **Caching**: Add Redis for:
   - Fighter profiles (1 hour)
   - Rankings (30 minutes)
   - Articles (1 hour)

2. **CDN**: Serve media assets from CDN

3. **Database**: 
   - MongoDB replica set for high availability
   - Read replicas for scalability

4. **Socket.IO**: 
   - Redis adapter for multi-server support
   - Sticky sessions on load balancer

5. **Monitoring**:
   - Prometheus + Grafana
   - Error tracking (Sentry)
   - Log aggregation (ELK stack)

---

**Architecture Design**: Production-ready, scalable REST API  
**Status**: ✅ Implemented and Validated
