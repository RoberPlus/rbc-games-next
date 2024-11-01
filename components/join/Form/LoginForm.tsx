'use client';

import { loginUserAction } from '@/utils/actions';
import FormContainer from '../../Form/FormContainer';
import FormInput from '@/components/Form/FormInput';
import { SubmitButton } from '@/components/Form/SubmitButton';
import { useAuth } from '@/hooks/useAuth';
import { getCookie, getCookies } from 'cookies-next';
import { useEffect } from 'react';

export function LoginForm() {
  return (
    <>
      <FormContainer action={loginUserAction}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput type="text" name="identifier" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        </div>
        <SubmitButton text="Log In" className="w-full" />
      </FormContainer>
    </>
  );
}
