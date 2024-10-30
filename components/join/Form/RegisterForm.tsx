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
import { INPUTS } from '@/utils/constants';

export function RegisterForm() {
  const { toast } = useToast();

  // Validation
  const form = useValidation('register');

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
  function onSubmit(data: any) {
    //const result = loginUserAction(data) as {};

    //const token = result.jwt;
    //new Token().setToken(token);

    toast({
      title: 'Log in success!',
      description: 'Welcome again!',
      duration: 9000,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className=" space-y-6">
        {Object.entries(INPUTS.REGISTER).map(([input, inputProps]) => (
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
