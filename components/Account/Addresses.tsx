import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import AddressForm from './AddressForm';
import AddressItem from './AddressItem';
import { createAddressAction } from '@/utils/actions';

const Addresses = () => {
  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle className="flex justify-between w-full">
          <p className="pt-2">Your addresses</p>
          <AddressForm
            action={createAddressAction}
            title="Add Address"
            description="Create a new address for billing."
            submitButtonLabel="Create Address"
            children="Create Address"
          />
        </CardTitle>
        <CardDescription>
          <span className="m-0 p-0 -translate-y-2">Change your billing addresses here.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <AddressItem />
      </CardContent>
    </Card>
  );
};

export default Addresses;
