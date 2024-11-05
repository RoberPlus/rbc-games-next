export type UserType = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  firstName?: string;
  id: number;
  lastName?: string;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
};

export type FormInput = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};

export type Address = {
  id: string;
  documentId: string;
  title: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    large?: MediaFormat;
  };
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

export type MediaFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
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
  icon: Media;
};

export type Game = {
  id: number;
  documentId: string;
  title: string;
  price: number;
  discount: number;
  slug: string;
  summary: string;
  video: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  platform: Platform;
  cover?: Media;
  wallpaper?: Media;
  gallery?: Media[];
};

export type WishList = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  game: Game;
};
