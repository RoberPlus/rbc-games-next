'use server';

import { ENV } from '@/utils/constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  RegisterSchema,
  LoginSchema,
  validateWithZodSchema,
  UpdateUserDataSchema,
} from './schemas';
import { Platform } from './types';
import { cookies } from 'next/headers';

const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : 'An error occurred!' };
};

// AUTH
export const getAuthUser = async () => {
  const nextCookies = cookies();
  const user = (await nextCookies).get('user') as any;

  if (!user) throw new Error('You must be logged in, please back to homepage');

  const parsedUser = JSON.parse(user.value);

  return parsedUser;
};

export const getToken = async () => {
  const nextCookies = cookies();
  const token = (await nextCookies).get('token') as any;

  if (!token) throw new Error('You must be logged in, please back to homepage');

  return token.value;
};

export const setTokenCookie = async (jwt: string) => {
  const jwtCookie = await cookies();

  jwtCookie.set({
    name: 'token',
    value: jwt,
    maxAge: 3600,
    path: '/',
  });
};

export const setUserDataCookie = async (user: object) => {
  const userCookie = await cookies();

  userCookie.set({
    name: 'user',
    value: JSON.stringify(user),
    maxAge: 3600,
    path: '/',
  });
};

export const deleteCookies = async () => {
  const savedCookies = await cookies();

  savedCookies.delete('token');
  savedCookies.delete('user');
};

// USER
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

    return { message: 'Regiter Successful!' };
    redirect('/join-sign-in');
  } catch (error) {
    return renderError(error);
  }
};

export const updateUserAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const token = await getToken();

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE_ME}/${user.id}`;

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(UpdateUserDataSchema, rawData);

    // Deleting the "repeat" fields
    const { repeatPassword, repeatEmail, ...updatedValues } = validatedFields;

    // Deleting the empty fields
    const filteredValues = Object.fromEntries(
      Object.entries(updatedValues).filter(([key, value]) => value !== '')
    );

    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(filteredValues),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    deleteCookies();

    redirect('/join-sign-in');
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

    await setTokenCookie(result.jwt);
    await setUserDataCookie(result.user);

    return { message: 'Login Successful!' };
    redirect('/');
  } catch (error) {
    return renderError(error);
  }
};

// DATA
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
