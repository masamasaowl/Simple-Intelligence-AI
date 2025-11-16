import express from 'express';
import {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
  deleteConversation
} from '../controllers/conversationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
// So the auth middleware would be used before all routes
router.use(protect);

router.route('/')

   // fetch all conversations between all users  @ GET /api/conversations
  .get(getConversations)   
  
  // create new conversation @ POST /api/conversations
  .post(createConversation); 

router.route('/:id')

  // Fetch a specific convo of a user @ GET /api/conversations/:id
  .get(getConversation)       

  // Delete a conversation @ DELETE /api/conversations/:id
  .delete(deleteConversation);  


  // New message on by an user @ POST /api/conversations/:id/message
router.post('/:id/message', sendMessage);  

export default router;