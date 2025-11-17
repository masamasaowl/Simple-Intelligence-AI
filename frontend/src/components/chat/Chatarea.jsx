// ┌──────────────────────────────────────┐
// │ Python tutorial                      │  ← Convo
// │ 5 messages                           │  ← 
// ├──────────────────────────────────────┤
// │                                      │
// │  [MessageList component]             │  
// │                                      │  
// │                                      │
// │                                      │
// ├──────────────────────────────────────┤
// │  [ChatInput component]               │  ← Input 
// └──────────────────────────────────────┘




import { useState, useRef, useEffect } from 'react';
import useConversationStore from '../../store/conversationStore';
import { conversationService } from '../../services/conversationService';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function ChatArea({ conversation }) {
  const [input, setInput] = useState('');
  const { updateConversation, setSending, sending } = useConversationStore();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim() || sending) return;

    const messageText = input.trim();
    setInput(''); // Clear input immediately
    setSending(true);

    try {
      // Call API
      const data = await conversationService.sendMessage(
        conversation._id,
        messageText
      );

      // Update conversation with new messages
      updateConversation(conversation._id, data.conversation);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Restore input on error
      setInput(messageText);
    } finally {
      setSending(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {conversation.title}
        </h2>
        <p className="text-sm text-gray-500">
          {conversation.messages.length} messages
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={conversation.messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        disabled={sending}
        placeholder={sending ? 'AI is thinking...' : 'Type your message...'}
      />
    </div>
  );
}

export default ChatArea;