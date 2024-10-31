'use client';

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
import SubmitButton from './SubmitButton';

import useValidation from '@/hooks/useValidation';
import { useAuth } from '@/hooks/useAuth';
import { loginUserAction } from '@/utils/actions';
import { INPUTS } from '@/utils/constants';

const inputs = INPUTS.LOGIN;

export function LoginForm() {
  const { toast } = useToast();
  const { login, updateUser } = useAuth();

  // Validation
  const form = useValidation('login');

  // On validation errors
  async function onError(errors: any) {
    const errorMessage = await Object.values(errors)
      .map((error: any) => error.message)
      .join(', ');
    toast({
      title: 'Input error',
      description: errorMessage,
      duration: 9000,
    });
  }

  // On correct validation
  async function onSubmit(data: any) {
    const result = (await loginUserAction(data)) as any;

    login(result.jwt);

    toast({
      title: 'Log in success!',
      description: 'Welcome again, explore our new games!',
      duration: 9000,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className=" space-y-6">
        {Object.entries(inputs).map(([input, inputProps]) => (
          <FormField
            key={input}
            control={form.control}
            name={inputProps.name as 'password' | 'identifier'}
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
