import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from '../config/database';
import { errorHandler, notFound } from '../middleware/errorHandler';

// Import routes
import authRoutes from '../routes/auth';
import fightersRoutes from '../routes/fighters';
import eventsRoutes from '../routes/events';
import fightsRoutes from '../routes/fights';
import rankingsRoutes from '../routes/rankings';
import articlesRoutes from '../routes/articles';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app: Express = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://ligadeboxeo.com',
      'https://www.ligadeboxeo.com',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  },
});

// CORS configuration
const corsOptions = {
  origin: [
    'https://ligadeboxeo.com',
    'https://www.ligadeboxeo.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const standardLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded',
    statusCode: 429,
  },
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded',
    statusCode: 429,
  },
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: 'Rate limit exceeded for chat messages',
});

// Apply rate limiters
app.use('/api/v1', standardLimiter);
app.use('/api/v1/admin', adminLimiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/fighters', fightersRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/fights', fightsRoutes);
app.use('/api/v1/admin/fights', fightsRoutes);
app.use('/api/v1/rankings', rankingsRoutes);
app.use('/api/v1/articles', articlesRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.IO for live chat
const liveChatNamespace = io.of('/live-chat');

// Store user count per event
const eventUserCounts: Map<string, Set<string>> = new Map();

liveChatNamespace.on('connection', (socket) => {
  const eventId = socket.handshake.query.eventId as string;
  const userId = socket.id;
  const userNickname = `Fan${Math.floor(Math.random() * 10000)}`;

  console.log(`User ${userId} connected to event ${eventId}`);

  // Add user to event
  if (!eventUserCounts.has(eventId)) {
    eventUserCounts.set(eventId, new Set());
  }
  eventUserCounts.get(eventId)?.add(userId);

  // Join event room
  socket.join(eventId);

  // Broadcast user joined
  liveChatNamespace.to(eventId).emit('user_joined', {
    user: userNickname,
    timestamp: new Date().toISOString(),
    userCount: eventUserCounts.get(eventId)?.size || 0,
  });

  // Handle new messages
  socket.on('new_message', (data: { message: string }) => {
    const messageData = {
      user: userNickname,
      message: data.message,
      timestamp: new Date().toISOString(),
      userId,
    };

    // Broadcast to all users in the event
    liveChatNamespace.to(eventId).emit('message_broadcast', messageData);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected from event ${eventId}`);

    // Remove user from event
    eventUserCounts.get(eventId)?.delete(userId);

    // Broadcast user left
    liveChatNamespace.to(eventId).emit('user_left', {
      user: userNickname,
      timestamp: new Date().toISOString(),
      userCount: eventUserCounts.get(eventId)?.size || 0,
    });

    // Clean up empty event rooms
    if (eventUserCounts.get(eventId)?.size === 0) {
      eventUserCounts.delete(eventId);
    }
  });
});

// Error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/v1`);
  console.log(`Socket.IO available at http://localhost:${PORT}/live-chat`);
});

export default app;
