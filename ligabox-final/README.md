
# Wired Home2035 (tRPC)
A direct replacement Home page that **calls your real tRPC endpoints**.
- Replace your Home with `src/pages/Home2035.wired.tsx`.
- Ensure your server exposes: `ai.ticker`, `events.next`, `ai.predictionByEvent`, `media.getFeed`, `media.getShorts`.

## REST API Implementation

**✅ Complete REST API is now implemented!**

This project includes a fully functional REST API server built with Express.js, MongoDB, and Socket.IO that follows the official Liga de Boxeo API Specifications v1.0.

### Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with sample data
npm run seed

# Start API server
npm run server
```

The API will be available at `http://localhost:3000/api/v1`

### Documentation

- 📖 **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- 🚀 **[README_API.md](./README_API.md)** - Quick start guide
- 🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- 🐛 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Problem solving
- ⚡ **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Developer cheat sheet
- ✅ **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Compliance checklist

### Features

✅ 13 REST endpoints (Authentication, Fighters, Events, Fights, Rankings, Articles)  
✅ Real-time chat with Socket.IO  
✅ JWT authentication with httpOnly cookies  
✅ Rate limiting & CORS protection  
✅ MongoDB database with seeded sample data  
✅ Comprehensive error handling  
✅ Pagination & filtering support  
✅ TypeScript for type safety  

### Default Credentials

- Email: `admin@ligadeboxeo.com`
- Password: `admin123`

### Validation

Run the validation script to verify everything is set up correctly:

```bash
npm run validate
```

---

## Frontend (Original README)

## Env
- `VITE_TRPC_URL=/api/trpc`

## Notes
- If types are available, replace `AppRouter = any` in `trpcClient.ts` with your real router type.
- This page gracefully degrades to placeholders if endpoints are missing.
