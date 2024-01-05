import Notiflix from "notiflix";
import type { Repository } from "../types/repository";
import type { Issue } from "../types/issue";
import { apiHelpers } from "./helpers";

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

export async function fetchAllRepositories(): Promise<Repository[]> {
  const { baseUrl, headers, fetchAllBody } = apiHelpers;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(fetchAllBody),
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

export async function fetchIssuesForRepository(repositoryFullName: string): Promise<Issue[]> {
  const { headers } = apiHelpers;

  const baseUrl = `https://api.github.com/repos/${repositoryFullName}/issues`;

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const issues = await response.json();

    const simplifiedIssues: Issue[] = issues.map((issue: any) => {
      return {
        id: issue.id,
        url: issue.url,
        title: issue.title,
        body: issue.body || "",
        comments: issue.comments,
      };
    });

    return simplifiedIssues;
  } catch (error) {
    Notiflix.Notify.failure(`Error fetching issues: ${error}`);
    return [];
  }
}
