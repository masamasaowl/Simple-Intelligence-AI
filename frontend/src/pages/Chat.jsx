// Chat.jsx 
// │
// ├── Sidebar.jsx 
// │   ├── Header
// │   ├── New Chat Button
// │   ├── Conversations List
// │   └── User Info + Logout
// │
// └── ChatArea.jsx 
//     ├── Header (Top)
//     ├── MessageList.jsx (Middle)
//     │   └── Message components
//     └── ChatInput.jsx (Bottom)

// OR

// └── EmptyState.jsx (When no conversation)
//     └── Welcome screen with features



import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useConversationStore from '../store/conversationStore';
import { conversationService } from '../services/conversationService';
import Sidebar from '../components/chat/Sidebar';
import ChatArea from '../components/chat/ChatArea';
import EmptyState from '../components/chat/EmptyState';

function Chat() {
  const { id } = useParams(); // Get conversation ID from URL
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    currentConversation,
    setConversations,
    setCurrentConversation,
    setLoading
  } = useConversationStore();

  // Fetch all conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Load specific conversation when ID changes
  useEffect(() => {
    if (id) {
      loadConversation(id);
    } else {
      setCurrentConversation(null);
    }
  }, [id]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await conversationService.getAll();
      setConversations(data.conversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (conversationId) => {
    try {
      const data = await conversationService.getById(conversationId);
      setCurrentConversation(data.conversation);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <ChatArea conversation={currentConversation} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default Chat;


