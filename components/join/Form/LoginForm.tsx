'use client';

import { loginUserAction } from '@/utils/actions';
import FormContainer from '../../Form/FormContainer';
import FormInput from '@/components/Form/FormInput';
import { SubmitButton } from '@/components/Form/SubmitButton';

export function LoginForm() {
  return (
    <>
      <FormContainer action={loginUserAction}>
        <div>
          <FormInput type="text" name="identifier" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        </div>
        <SubmitButton text="Log In" className="w-full" />
      </FormContainer>
    </>
  );
}
