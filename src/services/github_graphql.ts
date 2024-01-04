import type { GithubDataResponse } from "./types";

export async function fetchGithubData(
  token: string
): Promise<GithubDataResponse> {
  const githubData = {
    token: token,
    username: "etopritika",
  };

  const body = {
    query: `query GetRepository($owner: String!, $name: String!){
          repository(owner: $owner, name: $name){
            id
            nameWithOwner
            description
            url
          }
        }`,
    variables: {
      owner: githubData.username,
      name: "spa-task",
    },
  };

  const baseUrl = "https://api.github.com/graphql";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${githubData.token}`,
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
    return data.data as GithubDataResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
