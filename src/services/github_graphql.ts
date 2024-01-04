import Notiflix from "notiflix";
import type { Repository } from "../types/repository";

interface GraphQLResponse {
  data: {
    user: {
      repositories: {
        nodes: Repository[];
      };
    };
  };
  errors?: { message: string }[];
}

export async function fetchAllRepositories(
  token: string,
  username: string
): Promise<Repository[]> {
  console.log(token);
  const body = {
    query: `query GetAllRepositories($username: String!) {
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

    const data: GraphQLResponse = await response.json();

    if (data.errors) {
      throw new Error(data.errors.map((error) => error.message).join("\n"));
    }

    const repositories = data.data.user.repositories.nodes;

    Notiflix.Notify.success(
      `Received ${repositories.length} repositories from GitHub`
    );
    return repositories;
  } catch (error) {
    Notiflix.Notify.failure(`Error fetching repositories: ${error}`);
    return [];
  }
}
