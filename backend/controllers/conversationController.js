import Conversation from '../models/Conversation.js';
import { aiService } from '../services/aiService.js';

// let's go conventional!!


// ================= GET requests =================


// @desc    Get all conversations for logged-in user
// @route   GET /api/conversations
export const getConversations = async (req, res) => {
  try {
    // DB search
    const conversations = await Conversation.find({ userId: req.user.id })

      // To display the most recent first
      .sort({ updatedAt: -1 }); 
    
    // return all these values to React  
    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// @desc    Get single conversation
// @route   GET /api/conversations/:id
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    // if doesn't exist
    if (!conversation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Conversation not found' 
      });
    }

    // Make sure conversation belongs to user
    if (conversation.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this conversation' 
      });
    }

    // return the convo
    res.status(200).json({
      success: true,
      conversation
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};





// ================= POST requests =================


// @desc    Create new conversation
// @route   POST /api/conversations
export const createConversation = async (req, res) => {
  try {

    // convo title submitted by POST 
    const { title } = req.body;

    const conversation = await Conversation.create({
      userId: req.user.id,
      title: title || 'New Conversation',
      
      // initialize messages
      messages: []
    });

    res.status(201).json({
      success: true,
      conversation
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// @desc    Send message and get AI response
// @route   POST /api/conversations/:id/message
export const sendMessage = async (req, res) => {
  try {

    // fetch the message
    const { message } = req.body;

    // Find conversation
    const conversation = await Conversation.findById(req.params.id);

    // not found
    if (!conversation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Conversation not found' 
      });
    }

    // Make sure conversation belongs to user
    if (conversation.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    // Add user message to conversation in DB
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });


    // Prepare messages for AI ( in documentation)
    const apiMessages = conversation.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));


    // Call AI service 
    const aiResponse = await aiService.getChatCompletion(apiMessages);


    // Add AI response in the convo
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date()
    });

    // Auto-generate the title
    if (conversation.title === 'New Conversation' && conversation.messages.length === 2) {
      conversation.title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    }

    await conversation.save();

    res.status(200).json({
      success: true,
      conversation
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// ================= DELETE requests =================


// @desc    Delete conversation
// @route   DELETE /api/conversations/:id
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Conversation not found' 
      });
    }

    // do AUTH
    if (conversation.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    // delete from DB
    await conversation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Conversation deleted'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};