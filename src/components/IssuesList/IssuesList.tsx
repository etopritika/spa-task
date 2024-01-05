import React from "react";
import type { Issue } from "../../types/issue";
import "./IssuesList.css";
import Modal from "../Modal/Modal";

interface IssueListProps {
  list: Issue[];
}

const IssuesList: React.FC<IssueListProps> = ({ list }) => {
  return (
    <ul className="list_container">
      {list.map(({ body, url, comments, title, id }) => (
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
          <Modal />
        </li>
      ))}
    </ul>
  );
};

export default IssuesList;
