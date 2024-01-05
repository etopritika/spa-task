import React from 'react';
import type { Issue } from '../../types/issue';
import "./IssuesList.css"

interface IssueListProps {
  list: Issue[];
}

const IssuesList: React.FC<IssueListProps> = ({ list }) => {
  return (
    <ul className="list_container">
      {list.map(({ body, url, comments, title }) => (
        <li className='list_item' key={title}>
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
