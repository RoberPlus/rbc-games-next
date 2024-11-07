'use client';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Address } from '@/utils/types';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import { authFetcher } from '@/services/fetcher';
import { createAddressAction, deleteAddressAction, updateAddressAction } from '@/utils/actions';
import { Pencil, Trash2 } from 'lucide-react';
import AddressForm from './AddressForm';
import { ENV } from '@/utils/constants';
import AlertModal from '@/components/Custom/AlertModal';
import { Button } from '../ui/button';

const Addresses = () => {
  const userCookie = getCookie('user') as string;
  const user = userCookie ? JSON.parse(userCookie) : null;
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
                  <AlertModal
                    actionFn={onDeleteAddress}
                    itemId={addressProps.documentId}
                    deleteText="This will permanently delete this address."
                    Icon={
                      <Button className="bg-destructive hover:bg-red-800 text-white m-1">
                        <Trash2 />
                      </Button>
                    }
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

export default Addresses;
