import AccountLayout from '@/components/layouts/AccountLayout';
import BasicLayout from '@/components/layouts/BasicLayout';
import { TabsContent } from '@/components/ui/tabs';

const OrdersPage = () => {
  return (
    <>
      <BasicLayout isContainer>
        <AccountLayout>
          <TabsContent value="orders">
            <h2 className="mt-10 mb-10">Your orders</h2>
          </TabsContent>
        </AccountLayout>
      </BasicLayout>
    </>
  );
};

export default OrdersPage;
