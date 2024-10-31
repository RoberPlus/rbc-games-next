'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import SubmitButton from '../join/Form/SubmitButton';
import { INPUTS } from '@/utils/constants';
import { useToast } from '@/hooks/use-toast';
import useValidation from '@/hooks/useValidation';
import { useAuth } from '../../hooks/useAuth';

const ChangeNamesForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [disabled, setDisabled] = useState(true);

  // Validation
  const form = useValidation('changeNames');
  console.log(user);

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
    toast({
      title: 'Names changed!',
      duration: 9000,
    });
  }

  const NAMES = {
    firstName: {
      label: 'Name',
      type: 'text',
      name: 'firstName',
      placeholder: 'Jonh',
      value: user?.firstName,
    },
    lastName: {
      label: 'Lastname',
      type: 'text',
      name: 'lastName',
      placeholder: 'Doe',
      value: user?.lastName,
    },
  };

  function toggleSubmitButton() {
    setDisabled((prevState) => !prevState);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className=" space-y-6">
        {Object.entries(NAMES).map(([input, inputProps]) => (
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
                    defaultValue={inputProps.value}
                    onChange={toggleSubmitButton}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <SubmitButton label="Submit" disabled={disabled} />
      </form>
    </Form>
  );
};

export default ChangeNamesForm;
