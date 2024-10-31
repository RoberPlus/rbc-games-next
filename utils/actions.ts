'use server';

import { toast } from '@/hooks/use-toast';
import { ENV } from '@/utils/constants';
import { redirect } from 'next/navigation';

const renderError = (error: unknown): { message: string } => {
  return { message: error instanceof Error ? error.message : 'An error occurred!' };
};

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

export type Platform = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export const fetchPlatforms = async (): Promise<Platform[]> => {
  const sort = 'sort=order:asc'
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?populate=icon&${sort}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      throw new Error('Error fetching platforms');
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};
