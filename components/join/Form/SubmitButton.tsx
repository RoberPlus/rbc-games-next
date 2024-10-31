import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  label?: string;
  disabled?: boolean
};

const SubmitButton = ({ label = '', disabled = false }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending || disabled}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
