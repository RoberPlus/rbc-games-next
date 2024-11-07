import BasicLayout from '@/components/layouts/BasicLayout';
import { TabsContent } from '@/components/ui/tabs';
import { LoaderIcon } from 'lucide-react';

const AddressesPage = () => {
  return (
    <>
      <BasicLayout isContainer>
        <TabsContent value="addresses">
          <LoaderIcon className="animate-spin" />
        </TabsContent>
      </BasicLayout>
    </>
  );
};

export default AddressesPage;
