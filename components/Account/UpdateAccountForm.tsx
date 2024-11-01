'use client';

import FormContainer from '../Form/FormContainer';
import { updateUserAction } from '@/utils/actions';
import FormInput from '../Form/FormInput';
import { SubmitButton } from '../Form/SubmitButton';
import { getCookie } from 'cookies-next';

const UpdateAccountForm = () => {
  const rawUser = getCookie('user') as any;
  const user = JSON.parse(rawUser) as any;

  return (
    <>
      <FormContainer action={updateUserAction}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            type="text"
            name="firstName"
            label="First Name"
            defaultValue={user?.firstName}
            required={false}
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name"
            defaultValue={user?.lastName}
            required={false}
          />
          <FormInput type="email" name="email" label="New email" required={false} />
          <FormInput type="email" name="repeatEmail" label="Repeat email" required={false} />
          <FormInput type="password" name="password" label="New password" required={false} />
          <FormInput
            type="password"
            name="repeatPassword"
            label="Repeat password"
            required={false}
          />
        </div>
        <SubmitButton text="Update Profile" className="w-full" />
      </FormContainer>
    </>
  );
};

export default UpdateAccountForm;
