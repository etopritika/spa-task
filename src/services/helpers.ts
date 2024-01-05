export const apiHelpers = {
  baseUrl: "https://api.github.com/graphql",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
  fetchAllBody: {
    query: `query GetAllRepositories {
        user(login: "etopritika") {
          repositories(first: 100) {
            nodes {
              id
              nameWithOwner
              description
              url
            }
          }
        }
      }`,
  },
};
