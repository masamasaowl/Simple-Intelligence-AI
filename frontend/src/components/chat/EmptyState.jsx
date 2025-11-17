// If no chat is clicked
// ┌─────────────────────────────────────┐
// │                                     │
// │                                     │  ← Icon
// │                                     │
// │      Simple Intelligence            │  ← App 
// │                                     │
// │   Start a new conversation or       │  ← 
// │   select an existing one from       │
// │   the sidebar.                      │
// │                                     │
// │  ┌──────────────────────────────┐   │
// │  │  Get instant answers         │   │  ← card
// │  │    Ask me anything           │   │
// │  │                              │   │
// │  │  Save conversations          │   │
// │  │    Access your chat history  │   │
// │  │                              │   │
// │  │    Powered by AI             │   │
// │  │    Advanced language models  │   │
// │  └──────────────────────────────┘   │
// │                                     │
// └─────────────────────────────────────┘





function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Simple Intelligence
        </h2>
        <p className="text-gray-600 mb-6">
          Start a new conversation or select an existing one from the sidebar.
        </p>
        <div className="space-y-2 text-left bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <div className="font-medium text-gray-900">Get instant answers</div>
              <div className="text-sm text-gray-600">Ask me anything</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-medium text-gray-900">Save conversations</div>
              <div className="text-sm text-gray-600">Access your chat history</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <div className="font-medium text-gray-900">Powered by AI</div>
              <div className="text-sm text-gray-600">Advanced language models</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;