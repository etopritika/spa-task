export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

interface Comment {
  id: string;
  body: string;
}

export interface IssueWithComments {
  id: string;
  title: string;
  body: string;
  comments: {
    nodes: Comment[];
  };
}
