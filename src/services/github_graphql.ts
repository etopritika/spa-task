import type { GithubDataResponse } from "./types";

export async function fetchAllRepositories(
  token: string,
  username: string
): Promise<GithubDataResponse> {
  const body = {
    query: `query GetAllRepositories($username: String!){
      user(login: $username) {
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
    variables: {
      username: username,
    },
  };

  const baseUrl = "https://api.github.com/graphql";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.user.repositories.nodes as GithubDataResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
