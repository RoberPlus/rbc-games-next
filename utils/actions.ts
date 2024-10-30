'use client';
import { toast } from '@/hooks/use-toast';
import { ENV } from '@/utils/constants';
import { redirect } from 'next/navigation';

export const createUserAction = async (data: any) => {
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

  try {
    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return toast({
        title: 'Error, please try again later.',
        description: result.error.message,
        duration: 9000,
      });
    }

    redirect('/join/sign-in');
  } catch (error) {
    throw error;
  }
};

export const loginUserAction = async (data: any) => {
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return toast({
        title: 'Error, please try again later.',
        description: result.error.message,
        duration: 9000,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};
