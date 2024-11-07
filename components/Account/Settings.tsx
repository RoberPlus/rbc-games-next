import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import UpdateAccountForm from './UpdateAccountForm';
import { updateUserAction } from '@/utils/actions';

const Settings = () => {
  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
        <CardDescription>
          Change your account data here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <UpdateAccountForm action={updateUserAction} />
      </CardContent>
    </Card>
  );
};

export default Settings;
