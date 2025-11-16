import { create } from 'zustand';

const useConversationStore = create((set) => ({
  // define states
  // list of all conversations
  conversations: [],              

  // the convo we are looking at
  currentConversation: null,
  
  //
  loading: false,                
  
  // Sending message state, we will use it later
  sending: false,       
  
  
  // State changes (Actions)

  // Add convo inside array
  setConversations: (conversations) => {
    set({ conversations });
  },


  // currentConversation = null  →  currentConversation = {the chat you clicked}
  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation });
  },

  // add new conversation inside the array
  addConversation: (conversation) => {
    set((state) => ({

      // [NEW, old1, old2, old3]
      conversations: [conversation, ...state.conversations]
    }));
  },


  // update any chat
  // rename it
  updateConversation: (id, updatedData) => {
    set((state) => ({
        // find by id and rename it
      conversations: state.conversations.map((conv) =>
        conv._id === id ? { ...conv, ...updatedData } : conv
      ),


      // Also update if it's the open chat (smart!)
      currentConversation: 
        state.currentConversation?._id === id 
          ? { ...state.currentConversation, ...updatedData }
          : state.currentConversation
    }));
  },


  // Delete 
  deleteConversation: (id) => {
    set((state) => ({

      // Remove from list
      conversations: state.conversations.filter((conv) => conv._id !== id),

      // If the open chat was opened then, close it
      currentConversation: 
        state.currentConversation?._id === id 
          ? null 
          : state.currentConversation
    }));
  },


  // whenever we add a message
  addMessage: (conversationId, message) => {
    set((state) => {

    // Update the conversation in the list
      const updatedConversations = state.conversations.map((conv) => {
        if (conv._id === conversationId) {
          return {
            ...conv,

            // update the messages
            messages: [...conv.messages, message],

            // make it appear on top as it's most recent changes
            updatedAt: new Date()
          };
        }
        return conv;
      });


      // Also update the open conversation to display the new message
      const updatedCurrent = 
        state.currentConversation?._id === conversationId
          ? {
              ...state.currentConversation,

              // inside the message +
              messages: [...state.currentConversation.messages, message]
            }
          : state.currentConversation;

      return {
        conversations: updatedConversations,
        currentConversation: updatedCurrent
      };
    });
  },


  // update the loading bars
  setLoading: (loading) => set({ loading }),
  setSending: (sending) => set({ sending }),

  
  // Clear all (for logout)
  clearConversations: () => {
    set({
      conversations: [],
      currentConversation: null,
      loading: false,
      sending: false
    });
  }
}));

export default useConversationStore;