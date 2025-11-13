import mongoose from 'mongoose';
// Contains the messages and the collection of messages: conversation

// First, define what a single MESSAGE looks like
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    // Either you are the user or the AI messaging so
    enum: ['user', 'assistant'], 
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Now define what a CONVERSATION looks like
// A conversation is the collection of all the messages
const conversationSchema = new mongoose.Schema({
    // Link the user who started the conversation
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },

  // Contains all messages 
  messages: [messageSchema], // Array of messages
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field whenever we modify the conversation
// important so the most recent conversation can identified
conversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Conversation', conversationSchema);