import React from 'react';
import type { Issue } from '../../types/issue';

interface IssueListProps {
  list: Issue[];
}

const IssuesList: React.FC<IssueListProps> = ({ list }) => {
  return (
    <ul>
      {list.map(({ body, url, comments, title }) => (
        <li key={title}>
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
        </li>
      ))}
    </ul>
  );
};

export default IssuesList;
