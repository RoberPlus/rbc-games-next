'use server';

import { ENV } from '@/utils/constants';
import { redirect } from 'next/navigation';
import {
  RegisterSchema,
  LoginSchema,
  validateWithZodSchema,
  UpdateUserDataSchema,
  CreateAddressSchema,
} from './schemas';
import { Address, Game, Platform } from './types';
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
// PLATFORMS
export const fetchPlatforms = async (): Promise<Platform[] | { message: string }> => {
  const sort = 'sort=order:asc';
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?populate=icon&${sort}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result.data;
  } catch (error) {
    return renderError(error);
  }
};

// ADDRESS
export const createAddressAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const token = await getToken();
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;

    formData.delete('id');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(CreateAddressSchema, rawData);

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          ...validatedFields,
          user: user.id,
        },
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      return { message: result.error.message };
    }

    return { message: 'Address created!' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAddresses = async (): Promise<Address[]> => {
  const user = await getAuthUser();
  const token = await getToken();
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?filters[user][id][$eq]=${user.id}`;

  try {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      throw new Error('Failed to fetch addresses');
    }

    return result.data as Address[];
  } catch (error) {
    return [];
  }
};

export const updateAddressAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const token = await getToken();
  const addressId = formData.get('id') as string;

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;

  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(CreateAddressSchema, rawData);

  try {
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: validatedFields }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return { message: 'Address Updated!' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteAddressAction = async (addressId: string): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const token = await getToken();

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 204) {
      return { message: response.statusText };
    }

    return { message: 'Address Deleted!' };
  } catch (error) {
    return renderError(error);
  }
};

// GAMES
export const fetchLastGame = async (): Promise<Game | { message: string }> => {
  const sort = 'sort=publishedAt:desc';
  const pagination = 'pagination[limit]=1';
  const populate = 'populate=*';
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result.data;
  } catch (error) {
    return renderError(error);
  }
};

export const fetchGames = async ({
  quantity = 6,
  platformSlug = null,
  currentPage = 1,
  query = null,
}: {
  quantity?: number | undefined;
  platformSlug?: string | null | undefined;
  currentPage?: number;
  query?: string | null;
}): Promise<Game[] | { message: string }> => {
  const sort = 'sort[0]=publishedAt:desc';
  const platform = platformSlug && `filters[platform][slug][$eq]=${platformSlug}`;

  const pageSize = quantity && `pagination[pageSize]=${quantity}`;
  const pagination = currentPage && `pagination[page]=${currentPage}`;
  const search = query && `filters[title][$contains]=${query}`;

  const populate = `populate=*`;

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${platform}&${pageSize}&${populate}&${search}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result;
  } catch (error) {
    return renderError(error);
  }
};

export const fetchSearchGame = async (
  query?: string
): Promise<Game | Game[] | { message: string }> => {
  const sort = 'sort=publishedAt:desc';
  const pagination = 'pagination[limit]=1';
  const populate = 'populate=*';
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result;
  } catch (error) {
    return renderError(error);
  }
};

export const fetchGameDetails = async (
  game?: string
): Promise<Game | Game[] | { message: string }> => {
  const populateGame =
    'populate[0]=wallpaper&populate[1]=cover&populate[2]=gallery&populate[3]=platform';
  const populatePlatform = 'populate[4]=platform.icon';
  const filter = `filters[slug][$eq]=${game}`;
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filter}&${populateGame}&${populatePlatform}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result.data[0];
  } catch (error) {
    return renderError(error);
  }
};

// WISHLIST
export const checkGameWhishlist = async ({ gameDocumentId }: { gameDocumentId: string }) => {
  const user = await getAuthUser();
  const token = await getToken();

  const filterUser = `filters[user][id][$eq][0]=${user.id}`;
  const filterGame = `filters[game][documentId][$eq][1]=${gameDocumentId}`;

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WHISHLIST}?${filterUser}&${filterGame}`;

  try {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return false;
    }

    if (result.data.length === 0) {
      return false;
    }

    return result;
  } catch (error) {
    return renderError(error);
  }
};

export const addGameWhishlist = async ({ gameDocumentId }: { gameDocumentId: string }) => {
  const user = await getAuthUser();
  const token = await getToken();

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WHISHLIST}`;

  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { user: user.id, game: gameDocumentId } }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) {
      return false;
    }

    return result;
  } catch (error) {
    return renderError(error);
  }
};

export const deleteGameWhishlist = async ({
  wishListItemDocumentId,
}: {
  wishListItemDocumentId: string;
}) => {
  const user = await getAuthUser();
  const token = await getToken();

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WHISHLIST}/${wishListItemDocumentId}`;

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 204) {
      return { message: response.statusText };
    }

    return { message: 'Game removed!' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAllUserWishlist = async (): Promise<Game[] | { message: string }> => {
  const user = await getAuthUser();
  const token = await getToken();
  const populate = 'populate[0]=game&populate[1]=game.cover';
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WHISHLIST}?filters[user][id][$eq]=${user.id}&${populate}`;

  try {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) {
      return { message: result.error.message };
    }

    return result.data;
  } catch (error) {
    return renderError(error);
  }
};
