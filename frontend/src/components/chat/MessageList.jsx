// ┌──────────────────────────────────────┐
// │                                      │
// │  ┌──────────────┐                    │
// │  │ AI           │                    │  ← AI 
// │  │ Hello! How   │                    │  message 
// │  │ can I help?  │                    │
// │  │ 10:30 AM     │                    │  ← 
// │  └──────────────┘                    │
// │                                      │
// │                  ┌──────────────┐    │
// │                  │ You          │    │   ← User 
// │                  │ Explain      │    │    message
// │                  │ Python loops │    │
// │                  │ 10:31 AM     │    │  ← 
// │                  └──────────────┘    │
// └──────────────────────────────────────┘




function MessageList({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">👋</div>
          <p>Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {isUser ? 'You' : 'AI'}
        </div>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className="text-xs mt-2 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default MessageList;