export type UserType = {
  blocked: boolean,
  confirmed: boolean,
  createdAt: string,
  documentId: string,
  email: string,
  firstName?: string,
  id: number,
  lastName?: string,
  provider: string,
  publishedAt: string,
  updatedAt: string,
  username: string
}

export type FormInput = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
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

