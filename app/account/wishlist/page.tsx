import WishList from '@/components/Account/WishList';
import AccountLayout from '@/components/layouts/AccountLayout';
import BasicLayout from '@/components/layouts/BasicLayout';
import { TabsContent } from '@/components/ui/tabs';

const WishListPage = () => {
  return (
    <>
      <BasicLayout isContainer>
        <AccountLayout>
          <TabsContent value="wishlist">
            <WishList />
          </TabsContent>
        </AccountLayout>
      </BasicLayout>
    </>
  );
};

export default WishListPage;
