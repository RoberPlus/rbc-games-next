import * as z from 'zod';
import { ZodSchema } from 'zod';

// Validate Z Hook
export const validateWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(', '));
  }

  return result.data;
};

// Sign-in Schema
export const LoginSchema = z.object({
  identifier: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

// Sign-up Schema
export const RegisterSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  email: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
});

// UpdateNames Schema
export const UpdateUserDataSchema = z
  .object({
    firstName: z
      .string()
      .min(3, {
        message: 'Fistname must be at least 3 characters.',
      })
      .optional()
      .or(z.literal('')),
    lastName: z
      .string()
      .min(3, {
        message: 'Lastname must be at least 3 characters.',
      })
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters.',
      })
      .or(z.literal('')),
    repeatPassword: z.string(),
    email: z.string(),
    repeatEmail: z.string(),
  })
  .refine(
    (data) => {
      if (data.password && !data.repeatPassword) {
        return false;
      }
      if (!data.password && data.repeatPassword) {
        return false;
      }
      if (data.email && !data.repeatEmail) {
        return false;
      }
      if (!data.email && data.repeatEmail) {
        return false;
      }
      if (data.password && data.repeatPassword && data.password !== data.repeatPassword) {
        return false;
      }
      if (data.email && data.repeatEmail && data.email !== data.repeatEmail) {
        return false;
      }
      return true;
    },
    {
      message: 'Both fields must be filled and match if one of them is filled.',
      path: ['password', 'repeatPassword', 'email', 'repeatEmail'], // optional
    }
  );

// CreateAddress Schema
export const CreateAddressSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  name: z.string().min(4, {
    message: 'Name must be at least 4 characters.',
  }),
  address: z.string().min(3, {
    message: 'Address must be at least 3 characters.',
  }),
  city: z.string().min(4, {
    message: 'City must be at least 4 characters.',
  }),
  state: z.string().min(3, {
    message: 'State must be at least 3 characters.',
  }),
  postal_code: z.string().min(3, {
    message: 'Postal code must be at least 3 characters.',
  }),
  phone: z.string().min(8, {
    message: 'Phone must be at least 8 characters.',
  }),
});
