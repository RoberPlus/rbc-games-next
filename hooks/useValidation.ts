import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Sign-in Schema
export const FormLoginSchema = z.object({
  identifier: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

// Sign-up Schema
export const FormRegisterSchema = FormLoginSchema.extend({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  names: z.string().min(6, {
    message: 'Names must be at least 6 characters.',
  }),
});

// UpdateNames Schema
export const UpdateNamesSchema = z.object({
  firstName: z.string().min(3, {
    message: 'Fistname must be at least 4 characters.',
  }),
  lastName: z.string().min(3, {
    message: 'Lastname must be at least 6 characters.',
  }),
});

const useValidation = (schema: string) => {
  let currentSchema: any;

  switch (schema) {
    case 'login':
      currentSchema = FormLoginSchema;
      break;
    case 'register':
      currentSchema = FormRegisterSchema;
      break;
    case 'changeNames':
      currentSchema = UpdateNamesSchema;
      break;
    default:
      throw new Error('Invalid Schema');
  }

  type FormValues = z.infer<typeof currentSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
  });

  return form;
};

export default useValidation;
