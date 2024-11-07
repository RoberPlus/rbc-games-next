import Addresses from '@/components/Account/Addresses';
import AccountLayout from '@/components/layouts/AccountLayout';
import BasicLayout from '@/components/layouts/BasicLayout';
import { TabsContent } from '@/components/ui/tabs';

const AddressesPage = () => {
  return (
    <>
      <BasicLayout isContainer>
        <AccountLayout>
          <TabsContent value="addresses">
            <Addresses />
          </TabsContent>
        </AccountLayout>
      </BasicLayout>
    </>
  );
};

export default AddressesPage;
