'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import SubmitButton from './Form/SubmitButton';
import { createUserAction, loginUserAction } from '@/utils/actions';

// Sign-in Schema
const FormSignInSchema = z.object({
  identifier: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

// Sign-up Schema
const FormSignUpSchema = FormSignInSchema.extend({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  names: z.string().min(6, {
    message: 'Names must be at least 6 characters.',
  }),
});

type FormInput = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};

// Sign-in Inputs
const signInInputs: Record<string, FormInput> = {
  identifier: {
    label: 'Email',
    type: 'email',
    name: 'identifier',
    placeholder: 'email@email.com',
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: '',
  },
};

// Sign-up Inputs
const signUpInputs: Record<string, FormInput> = {
  username: {
    label: 'Username',
    type: 'text',
    name: 'username',
    placeholder: 'gamer249',
  },
  names: {
    label: 'Name & Last Name',
    type: 'text',
    name: 'names',
    placeholder: 'Jonh Doe',
  },
  email: {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'email@email.com',
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: '',
  },
};

export function SignForm() {
  const { toast } = useToast();

  // Get current pathname to define: schema, action and inputs in the form
  // depends on login or Sign up path.
  const pathname = usePathname();

  // Define what schema, action and inputs use.
  let currentSchema: z.ZodObject<any>;
  let currentFormInputs: Record<string, FormInput>;
  let currentAction: (data: FormValues) => void;

  if (pathname === '/join/sign-in') {
    currentSchema = FormSignInSchema;
    currentFormInputs = signInInputs;
    currentAction = loginUserAction;
  } else {
    currentSchema = FormSignUpSchema;
    currentFormInputs = signUpInputs;
    currentAction = createUserAction;
  }

  // Validate Form
  type FormValues = z.infer<typeof currentSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
  });

  function onError(errors: any) {
    const errorMessage = Object.values(errors)
      .map((error: any) => error.message)
      .join(', ');
    toast({
      title: 'Input error',
      description: errorMessage,
      duration: 9000,
    });
  }

  // On correct validation
  function onSubmit(data: FormValues) {
    return currentAction(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className=" space-y-6">
        {Object.entries(currentFormInputs).map(([input, inputProps]) => (
          <FormField
            key={input}
            control={form.control}
            name={inputProps.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{inputProps.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={inputProps.placeholder}
                    {...field}
                    type={inputProps.type}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <SubmitButton label="Submit" />
      </form>
    </Form>
  );
}
