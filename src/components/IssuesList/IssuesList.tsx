import React from "react";
import type { Issue } from "../../types/issue";
import "./IssuesList.css";
import Modal from "../Modal/Modal";

interface IssueListProps {
  list: Issue[];
  repoName: string;
}

const IssuesList: React.FC<IssueListProps> = ({ list, repoName }) => {
  const [issueList, setIssueList] = React.useState<Issue[]>([...list]);

  const handleIssues = (issues: Issue[]) => {
    setIssueList([...issues]);
  };

  return (
    <ul className="list_container">
      {issueList.map(({ body, url, comments, title, id }) => (
        <li className="list_item" key={id}>
          <p>
            <strong>Title:</strong> {title}
          </p>
          <p>
            <strong>Body:</strong> {body}
          </p>
          <p>
            <strong>Comments:</strong> {comments}
          </p>
          <p>
            <strong>URL:</strong> {url}
          </p>
          <Modal issueId={id} repoName={repoName} handleIssues={handleIssues} />
        </li>
      ))}
    </ul>
  );
};

export default IssuesList;
