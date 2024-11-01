'use server';

import { toast } from '@/hooks/use-toast';
import { ENV } from '@/utils/constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RegisterSchema, LoginSchema, UpdateNamesSchema, validateWithZodSchema } from './schemas';
import { Platform } from './types';
import { cookies } from 'next/headers';

const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : 'An error occurred!' };
};

// TODO AUTH
export const getAuthUser = async () => {}; //Promise<UserType> => {
// const userCtrl = new User();
// const user = userCtrl.getMe();

// if (!user) throw new Error('You must be logged in, please back to homepage');

// return user;
//}

//TESTEAR RESULT Y RENDER ERROR
export const createUserAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(RegisterSchema, rawData);

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    toast({
      title: 'Profile Created.',
      description: 'Now you can log in!',
      duration: 9000,
    });

    redirect('/join-sign-in');
  } catch (error) {
    return renderError(error);
  }
};

//TESTEAR RESULT Y RENDER ERROR
export const updateUserAction = async (
  userId: number | undefined,
  formData: FormData
): Promise<{ message: string }> => {
  // TODO: Cambiar endpoint
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE_ME}/${userId}`;

  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(UpdateNamesSchema, rawData);

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields),
  };

  try {
    const response = await authFetch({ url: url, params: params });
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    revalidatePath('/account');
    return { message: 'Update Successful!' };
  } catch (error) {
    return renderError(error);
  }
};

export const loginUserAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(LoginSchema, rawData);

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    const jwtCookie = await cookies();
    const userDataCookie = await cookies();

    jwtCookie.set({
      name: 'token',
      value: result.jwt,
      maxAge: 3600,
      path: '/',
    });

    userDataCookie.set({
      name: 'user',
      value: JSON.stringify(result.user),
      maxAge: 3600,
      path: '/',
    });

    return { message: 'Login Successful!' };
    redirect('/');
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPlatforms = async (): Promise<Platform[] | { message: string }> => {
  const sort = 'sort=order:asc';
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?populate=icon&${sort}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return renderError('Response error, try again later!');
    }

    return result.data;
  } catch (error) {
    return renderError(error);
  }
};
