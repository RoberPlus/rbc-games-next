import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormInput from '../Form/FormInput';
import FormContainer, { actionFunction } from '../Form/FormContainer';
import { SubmitButton } from '../Form/SubmitButton';
import { createAddressAction } from '@/utils/actions';
import { Address } from '@/utils/types';
import { ReactNode } from 'react';

type AddressFormProps = {
  title?: string;
  description?: string;
  submitButtonLabel?: string;
  address?: Address;
  action: actionFunction;
  children?: any | React.ReactNode | Element;
};

const AddressForm = ({
  title,
  action,
  description,
  submitButtonLabel,
  address,
  children,
}: AddressFormProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{children}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormContainer action={action}>
            <input
              type="hidden"
              name="id"
              value={address?.documentId ? address?.documentId : undefined}
            />
            <FormInput type="text" name="title" label="Title" defaultValue={address?.title} />
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput type="text" name="name" label="Your name" defaultValue={address?.name} />
              <FormInput
                type="text"
                name="address"
                label="Address"
                defaultValue={address?.address}
              />
              <FormInput type="text" name="city" label="City" defaultValue={address?.city} />
              <FormInput type="text" name="state" label="State" defaultValue={address?.state} />
              <FormInput
                type="text"
                name="postal_code"
                label="Postal code"
                defaultValue={address?.postal_code}
              />
              <FormInput type="text" name="phone" label="Phone" defaultValue={address?.phone} />
            </div>
            <SubmitButton text={submitButtonLabel} className="w-full" />
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressForm;
