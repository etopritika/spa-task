import Notiflix from "notiflix";
import type { Repository } from "../types/repository";
import type { Issue } from "../types/issue";
import { apiHelpers } from "./helpers";

interface GraphQLResponse<T> {
  data?: T;
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

    const data: GraphQLResponse<{ user: { repositories: { nodes: Repository[] } } }> = await response.json();

    if (!response.ok || data.errors) {
      const errorMessage = data.errors
        ? data.errors[0].message
        : `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const repositories = data.data?.user?.repositories?.nodes || [];

    Notiflix.Notify.success(`Received ${repositories.length} repositories from GitHub`);
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

    const issues = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const simplifiedIssues: Issue[] = issues.map((issue: any) => ({
      id: issue.node_id,
      url: issue.url,
      title: issue.title,
      body: issue.body || "",
      comments: issue.comments,
    }));

    return simplifiedIssues;
  } catch (error) {
    Notiflix.Notify.failure(`Error fetching issues: ${error}`);
    return [];
  }
}

export async function addCommentToIssue(issueId: number, commentBody: string): Promise<void> {
  const { headers, baseUrl } = apiHelpers;

  const requestBody = {
    query: `
      mutation AddCommentToIssue($issueId: ID!, $commentBody: String!) {
        addComment(input: {subjectId: $issueId, body: $commentBody}) {
          clientMutationId
        }
      }
    `,
    variables: { issueId, commentBody },
  };

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: GraphQLResponse<{ addComment: { clientMutationId: string } }> = await response.json();

    if (responseData.errors) {
      throw new Error(responseData.errors[0].message);
    }

    Notiflix.Notify.success("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment:", error);
    Notiflix.Notify.failure(`Error adding comment: ${error}`);
  }
}
