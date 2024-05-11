import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const registrationSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Invalid email address.'),
    firstName: z
      .string()
      .nonempty('First Name is required')
      .min(1, 'First Name is too short.')
      .max(50, 'First Name is too long.'),
    lastName: z
      .string()
      .nonempty('Last Name is required')
      .min(1, 'Last Name is too short.')
      .max(50, 'Last Name is too long.'),
    password: z
      .string()
      .refine(
        (value) => passwordRegex.test(value),
        'Password must contain at least one lowercase, upper, and number.',
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });
