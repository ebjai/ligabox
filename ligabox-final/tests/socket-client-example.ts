// Socket.IO Client Example for Live Chat
// This demonstrates how to connect and interact with the real-time chat

import { io } from 'socket.io-client';

// Connect to the live chat namespace
const socket = io('http://localhost:3000/live-chat', {
  query: {
    eventId: 'championship-night-2025' // Event ID to join
  }
});

// Listen for connection
socket.on('connect', () => {
  console.log('✅ Connected to live chat');
  console.log('Socket ID:', socket.id);
});

// Listen for user joined events
socket.on('user_joined', (data) => {
  console.log('👋 User joined:', data);
  // Example: { user: 'Fan1234', timestamp: '2025-10-20T...', userCount: 10 }
});

// Listen for broadcast messages
socket.on('message_broadcast', (data) => {
  console.log('💬 New message:', data);
  // Example: { user: 'Fan5678', message: 'Great fight!', timestamp: '...', userId: '...' }
});

// Listen for user left events
socket.on('user_left', (data) => {
  console.log('👋 User left:', data);
  // Example: { user: 'Fan1234', timestamp: '2025-10-20T...', userCount: 9 }
});

// Send a message
function sendMessage(message: string) {
  socket.emit('new_message', { message });
  console.log('📤 Sent message:', message);
}

// Example: Send a message after 2 seconds
setTimeout(() => {
  sendMessage('This is an amazing fight!');
}, 2000);

// Handle disconnect
socket.on('disconnect', () => {
  console.log('❌ Disconnected from live chat');
});

// Handle errors
socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

export { socket, sendMessage };
