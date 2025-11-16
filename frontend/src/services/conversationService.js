import api from '../utils/api';


// He will support us like this

// conversationService = {
//   getAll: () => fetch all chats from server
//   getById: (id) => fetch one specific chat
//   create: () => create new chat on server
//   sendMessage: (id, msg) => send message to server
//   delete: (id) => delete chat from server
// }



export const conversationService = {
  // Get all conversations
  getAll: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },

  // Get single conversation
  getById: async (id) => {
    const response = await api.get(`/conversations/${id}`);
    return response.data;
  },

  // Create new conversation
  create: async (title = 'New Conversation') => {
    const response = await api.post('/conversations', { title });
    return response.data;
  },

  // Send message
  sendMessage: async (conversationId, message) => {
    const response = await api.post(`/conversations/${conversationId}/message`, {
      message
    });
    return response.data;
  },

  // Delete conversation
  delete: async (id) => {
    const response = await api.delete(`/conversations/${id}`);
    return response.data;
  }
};