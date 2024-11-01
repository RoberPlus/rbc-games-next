'use client';

import FormContainer from '../Form/FormContainer';
import { updateUserAction } from '@/utils/actions';
import FormInput from '../Form/FormInput';
import { SubmitButton } from '../Form/SubmitButton';
import { getCookie } from 'cookies-next';

const ChangeNamesForm = () => {
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
          />
          <FormInput type="text" name="lastName" label="Last Name" defaultValue={user?.lastName} />
        </div>
        <SubmitButton text="Update Profile" className="w-full" />
      </FormContainer>
    </>
  );
};

export default ChangeNamesForm;
