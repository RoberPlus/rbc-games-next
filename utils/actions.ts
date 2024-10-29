import { toast } from '@/hooks/use-toast';
import { ENV } from '@/utils/constants';
import { redirect } from 'next/navigation';

export const createUserAction = async (data: any) => {
  try {
    // If user has account:
    //const user = await currentUser();
    //if (user) throw new Error('You already have an account!');

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;

    // delete the names input (temp)
    delete data.names;

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return toast({
        title: 'Error, please try again later.',
        description: result.error.message,
        duration: 9000,
      });
    }

    toast({
      title: 'User registered!',
      description: 'Now you can login',
      duration: 9000,
    });

    redirect('/join/sign-in');
  } catch (error) {
    throw error;
  }
};

export const loginUserAction = async (data: any) => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;

    // delete the names input (temp)
    delete data.names;
    delete data.username;

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return toast({
        title: 'Error, please try again later.',
        description: result.error.message,
        duration: 9000,
      });
    }

    toast({
      title: 'Log in success!',
      description: 'Welcome again!',
      duration: 9000,
    });

    redirect('/');
  } catch (error) {
    throw error;
  }
};
