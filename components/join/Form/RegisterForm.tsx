'use client';

import FormContainer from '@/components/Form/FormContainer';
import FormInput from '@/components/Form/FormInput';
import { SubmitButton } from '@/components/Form/SubmitButton';
import { createUserAction } from '@/utils/actions';

export function RegisterForm() {
  return (
    <>
      <FormContainer action={createUserAction}>
        <div>
          <FormInput type="text" name="username" label="Username" />
          <FormInput type="email" name="email" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        </div>
        <SubmitButton text="Create Account" className="w-full" />
      </FormContainer>
    </>
  );
}
