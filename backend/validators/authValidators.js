import { z } from 'zod';

// Register validation
export const registerSchema = z.object({
  // from form body
  body: z.object({

    // our form fields has
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .trim(),
    email: z.string()
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password too long')
  })
});

// Login validation
export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(5, 'Password is required')
      .max(100, 'Password too long')
  })
});