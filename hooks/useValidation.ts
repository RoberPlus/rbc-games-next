import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Sign-in Schema
export const FormLoginSchema = z.object({
  identifier: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

// Sign-up Schema
export const FormRegisterchema = FormLoginSchema.extend({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  names: z.string().min(6, {
    message: 'Names must be at least 6 characters.',
  }),
});

const useValidation = (schema: string) => {
  const currentSchema = schema === 'login' ? FormLoginSchema : FormRegisterchema;
  type FormValues = z.infer<typeof currentSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
  });

  return form;
};

export default useValidation;
