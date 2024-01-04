import Notiflix from "notiflix";
import type { Repository } from "../types/repository";

export async function fetchAllRepositories(
  token: string,
  username: string
): Promise<Repository[]> {
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
    const rep = data.data.user.repositories.nodes;

    Notiflix.Notify.success(`Received ${rep.length} repositories from GitHub`);
    return rep;
  } catch (error: any) {
    Notiflix.Notify.failure(`${error}`);
    return [];
  }
}
