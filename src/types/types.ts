export type Repository = {
  id: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
};

export type Issue = {
  id: number;
  url: string;
  title: string;
  body: string | null;
  comments: number;
  number: number;
};

export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export interface Comment {
  id: string;
  body: string;
}
