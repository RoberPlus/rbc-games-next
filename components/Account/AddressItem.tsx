'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Address } from '@/utils/types';
import { deleteAddressAction, fetchAddresses, updateAddressAction } from '@/utils/actions';
import AddressForm from './AddressForm';
import FormContainer from '../Form/FormContainer';
import AddressSkeleton from './AddressSkeleton';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const AddressItem = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAddresses = (await fetchAddresses()) as any;
        setAddresses(fetchedAddresses);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <AddressSkeleton />
          <AddressSkeleton />
          <AddressSkeleton />
        </>
      ) : (
        <>
          {Object.keys(addresses).length === 0 ? (
            <p className="my-10">No addresses available.</p>
          ) : (
            Object.entries(addresses).map(([address, addressProps]) => (
              <div
                className="flex items-center space-x-4 rounded-md border p-4 mb-2"
                key={addressProps.documentId}
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{addressProps.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {addressProps.name}, {addressProps.address}, {addressProps.city},{' '}
                    {addressProps.state}, {addressProps.postal_code}
                  </p>
                </div>
                <AddressForm
                  title="Edit Address"
                  description="Edit your address"
                  action={updateAddressAction}
                  submitButtonLabel="Edit address"
                  address={addressProps}
                >
                  <Pencil />
                </AddressForm>
                <DeleteAddressModal addressId={addressProps.documentId} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

function DeleteAddressModal({ addressId }: { addressId: string }) {
  const deleteBooking = deleteAddressAction.bind(null, { addressId });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive hover:bg-red-800 text-white">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-red-800 text-white">
            <FormContainer action={deleteBooking}>
              <button type="submit">Continue</button>
            </FormContainer>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddressItem;
