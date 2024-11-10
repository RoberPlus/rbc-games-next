import { getCookie } from 'cookies-next';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ENV } from '@/utils/constants';
import { authFetcher } from '@/services/fetcher';
import useSWR from 'swr';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const Orders = () => {
  const userCookie = getCookie('user') as string;
  const user = userCookie ? JSON.parse(userCookie) : null;
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}${
    user?.id ? `?filters[user][id][$eq]=${user.id}` : ''
  }`;
  const { data, error, isLoading, mutate } = useSWR(url, authFetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const orders = data.data as any;

  return (
    <Card className="my-10">
      <CardHeader>My orders</CardHeader>
      <CardContent className="w-full">
        <div>
          <>
            {Object.keys(orders).length === 0 ? (
              <p className="my-10">No addresses available.</p>
            ) : (
              Object.entries(orders).map(([order, orderProps]: any) => (
                <div
                  className="flex items-center space-x-4 rounded-md border p-4 mb-2"
                  key={orderProps.documentId}
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{orderProps.createdAt}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderProps.products.length} Products
                    </p>
                  </div>
                  <p className="text-lg font-medium">Total: ${orderProps.totalPayment}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={'secondary'} className="mr-3 [&_svg]:size-6">
                        <Eye />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Order details</DialogTitle>
                        <DialogDescription>{orderProps.products.length} Products</DialogDescription>
                      </DialogHeader>
                      <p>
                        Order ID: <span className="font-extralight"> {orderProps.documentId}</span>
                      </p>
                      <p>
                        Status: <span className="text-green-600 font-extralight">Completed</span>
                      </p>
                      <p>
                        Payment method: <span className="font-extralight">Stripe</span>
                      </p>
                      <p className="mt-3">Items:</p>
                      <>
                        {Object.entries(orderProps.products).map(([index, item]: any) => (
                          <div key={item.gameId} className="flex justify-between border-y  p-2">
                            <p className="flex flex-col">
                              <span>{item.gameTitle}</span>
                              <span className="text-sm font-extralight">{item.platform}</span>
                            </p>

                            <p className="font-extralight translate-y-2">
                              {item.quantity}x <span className="font-medium">${item.price}</span>
                            </p>
                          </div>
                        ))}
                      </>
                      <p className="mt-3">Billing address:</p>
                      <div
                        className="flex items-center space-x-4 rounded-md border p-4 mb-2"
                        key={orderProps.addressShipping.title}
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {orderProps.addressShipping.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {orderProps.addressShipping.name}, {orderProps.addressShipping.address},{' '}
                            {orderProps.addressShipping.city}, {orderProps.addressShipping.state},{' '}
                            {orderProps.addressShipping.postal_code}
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <p className="text-lg font-medium">Total: ${orderProps.totalPayment}</p>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))
            )}
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default Orders;
