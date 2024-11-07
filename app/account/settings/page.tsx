import Settings from '@/components/Account/Settings';
import AccountLayout from '@/components/layouts/AccountLayout';
import BasicLayout from '@/components/layouts/BasicLayout';
import { TabsContent } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <>
      <BasicLayout isContainer>
        <AccountLayout>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </AccountLayout>
      </BasicLayout>
    </>
  );
};

export default SettingsPage;
