// ┌─────────────────────┐
// │ Simple Intelligence │  ← Header with app name
// │        =            │  ← Toggle button 
// │                     │
// │   [+ New Chat]      │  ← Create new conversation 
// ├─────────────────────┤
// │ □ Chat about AI     │  ← Conversation (inactive)
// │   3 messages        │
// │                     │
// │ ■ Python tutorial   │  ← Active conversation 
// │   5 messages        │  ← Delete icon 
// │                     │
// │ □ Recipe ideas      │  ← Another conversation
// │   2 messages        │
// ├─────────────────────┤
// │ John Doe            │  ← User name
// │ john@example.com    │  ← User email
// │ [Logout]            │  ← Logout button
// └─────────────────────┘



import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import useConversationStore from '../../store/conversationStore';
import useAuthStore from '../../store/authStore';
import { conversationService } from '../../services/conversationService';
import Button from '../common/Button';

function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { 
    conversations, 
    currentConversation,
    addConversation,
    setCurrentConversation,
    deleteConversation 
  } = useConversationStore();

  // Create new conversation
  const handleNewChat = async () => {
    try {
      const data = await conversationService.create();
      addConversation(data.conversation);
      navigate(`/chat/${data.conversation._id}`);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  // Select conversation
  const handleSelectConversation = (conv) => {
    setCurrentConversation(conv);
    navigate(`/chat/${conv._id}`);
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const handleDeleteConversation = async (e, convId) => {
  e.stopPropagation(); // Prevent selecting conversation when clicking delete
  
  if (!window.confirm('Delete this conversation?')) return;

  try {
    await conversationService.delete(convId);
    deleteConversation(convId);
    
    // If we deleted the current conversation, navigate to /chat
    if (currentConversation?._id === convId) {
      navigate('/chat');
    }
  } catch (error) {
    console.error('Failed to delete conversation:', error);
  }
};


  return (
    <div 
      className={`${
        isOpen ? 'w-80' : 'w-0'
      } bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Simple Intelligence</h1>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            ☰
          </button>
        </div>

        {/* New Chat Button */}
        <Button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          + New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No conversations yet
          </div>
        ) : (
          <div className="p-2">
            {conversations.map((conv) => (
                <div
                    key={conv._id}
                    className={`relative group w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                    currentConversation?._id === conv._id
                        ? 'bg-gray-700'
                        : 'hover:bg-gray-800'
                    }`}
                >
                    <button
                    onClick={() => handleSelectConversation(conv)}
                    className="w-full text-left"
                    >
                    <div className="font-medium truncate pr-8">{conv.title}</div>
                    <div className="text-sm text-gray-400 truncate">
                        {conv.messages.length} messages
                    </div>
                    </button>
                    
                    {/* Delete button (appears on hover) */}
                    <button
                    onClick={(e) => handleDeleteConversation(e, conv._id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-600 rounded transition-all"
                    title="Delete conversation"
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
                ))}
          </div>
        )}
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-800 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
