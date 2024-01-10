export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export interface Comment {
  id: string;
  body: string;
}

