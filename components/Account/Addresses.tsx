'use client';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Address } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import { authFetcher } from '@/services/fetcher';
import { createAddressAction, deleteAddressAction, updateAddressAction } from '@/utils/actions';
import { Pencil, Trash2 } from 'lucide-react';
import AddressForm from './AddressForm';
import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { ENV } from '@/utils/constants';

const Addresses = () => {
  const user = getCookie('user') as any;
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}${
    user?.id ? `?filters[user][id][$eq]=${user.id}` : ''
  }`;
  const { data, error, isLoading, mutate } = useSWR(url, authFetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const addresses = data.data as Address[];

  const onDeleteAddress = async (addressId: string) => {
    await deleteAddressAction(addressId);
    mutate();
  };

  return (
    <Card className="my-10">
      <CardHeader>
        <AddressForm
          title="Create Address"
          description="Create a new address for billing"
          action={createAddressAction}
          submitButtonLabel="Create address"
          mutate={mutate}
        >
          Create Address
        </AddressForm>
      </CardHeader>
      <CardContent className="w-full">
        <div>
          <>
            {Object.keys(addresses).length === 0 ? (
              <p className="my-10">No addresses available.</p>
            ) : (
              Object.entries(addresses).map(([address, addressProps]) => (
                <div
                  className="flex items-center space-x-4 rounded-md border p-4 mb-2"
                  key={addressProps.title}
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
                    mutate={mutate}
                    address={addressProps}
                  >
                    <Pencil />
                  </AddressForm>
                  <DeleteAddressModal
                    addressId={addressProps.documentId}
                    onDeleteAddress={onDeleteAddress}
                  />
                </div>
              ))
            )}
          </>
        </div>
      </CardContent>
    </Card>
  );
};

function DeleteAddressModal({
  addressId,
  onDeleteAddress,
}: {
  addressId: string;
  onDeleteAddress: (addressId: string) => void;
}) {
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
            <button type="submit" onClick={() => onDeleteAddress(addressId)}>
              Continue
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default Addresses;
