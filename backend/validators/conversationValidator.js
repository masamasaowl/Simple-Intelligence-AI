import { z } from 'zod';


// By POST when creating a new conversation
export const createConversationSchema = z.object({

    // the body of post must have title
  body: z.object({
    title: z.string().min(1).max(100).optional()
  })
});

// when messaging AI to avoid token exhaustion
export const sendMessageSchema = z.object({

    // check if not too long
  body: z.object({
    message: z.string().min(1).max(5000, 'Message too long')
  }),

  // also we check the ID to not if it is the right convo
  params: z.object({

    // it must be a valid MongoDB ID (24 hex characters)
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid conversation ID')
  })
});