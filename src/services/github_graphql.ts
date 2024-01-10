import Notiflix from "notiflix";

import type { Repository, Issue } from "../types/types";
import type { GraphQLResponse, Comment } from "./types";

import { apiHelpers } from "./helpers";


export async function fetchAllRepositories(): Promise<Repository[]> {
  const { baseUrl, headers, fetchAllBody } = apiHelpers;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(fetchAllBody),
    });

    const data: GraphQLResponse<{
      user: { repositories: { nodes: Repository[] } };
    }> = await response.json();

    if (!response.ok || data.errors) {
      const errorMessage = data.errors
        ? data.errors[0].message
        : `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const repositories = data.data?.user?.repositories?.nodes || [];

    Notiflix.Notify.success(
      `Received ${repositories.length} repositories from GitHub`
    );
    return repositories;
  } catch (error) {
    Notiflix.Notify.failure(`Error fetching repositories: ${error}`);
    return [];
  }
}


export async function fetchIssuesForRepository(
  repositoryFullName: string
): Promise<Issue[]> {
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

    const filteredIssues = issues.filter((issue: { pull_request: any }) => !issue.pull_request);

    const simplifiedIssues: Issue[] = filteredIssues.map((issue: any) => ({
      id: issue.node_id,
      url: issue.url,
      title: issue.title,
      body: issue.body || "",
      comments: issue.comments,
      number: issue.number,
    }));

    return simplifiedIssues;
  } catch (error) {
    Notiflix.Notify.failure(`Error fetching issues: ${error}`);
    return [];
  }
}


export async function addCommentToIssue(
  issueId: number,
  commentBody: string
): Promise<void> {
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

    const responseData: GraphQLResponse<{
      addComment: { clientMutationId: string };
    }> = await response.json();

    if (responseData.errors) {
      throw new Error(responseData.errors[0].message);
    }

    Notiflix.Notify.success("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment:", error);
    Notiflix.Notify.failure(`Error adding comment: ${error}`);
  }
}

export async function fetchIssueWithComments(
  repositoryFullName: string,
  issueNumber: number
): Promise<Comment[]> {
  const { baseUrl, headers } = apiHelpers;

  const owner = repositoryFullName.split("/")[0];
  const repo = repositoryFullName.split("/")[1];

  const requestBody = {
    query: `
      query GetIssueWithComments($owner: String!, $repo: String!, $issueNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $issueNumber) {
            id
            title
            body
            comments(last: 10) {
              nodes {
                id
                body
              }
            }
          }
        }
      }
    `,
    variables: {
      owner,
      repo,
      issueNumber,
    },
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

    const data = await response.json();

    if (data.errors) {
      throw new Error(`${data.errors[0]?.message}`);
    }

    const comments = data.data?.repository?.issue?.comments?.nodes;

    return comments;
  } catch (error) {
    console.error("Error fetching issue with comments.", error);
    return [];
  }
}
