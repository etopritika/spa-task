type Repository = {
  id: string;
  nameWithOwner: string;
  description: string;
  url: string;
};

export type GithubDataResponse = {
  repository: Repository;
};