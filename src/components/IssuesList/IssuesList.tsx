import React from "react";

import { Card, List } from "antd";
import Modal from "../Modal/Modal";

import type { Issue } from "../../types/types";
import "./IssuesList.css";

interface IssueListProps {
  list: Issue[];
  repoName: string;
}

const IssuesList: React.FC<IssueListProps> = ({ list, repoName }) => {
  const [issueList, setIssueList] = React.useState<Issue[]>([...list]);

  const handleIssues = (issues: Issue[]) => {
    setIssueList([...issues]);
  };

  React.useEffect(() => {
    setIssueList(list);
  }, [list]);

  return (
    <List
      grid={{
        column: 2,
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={issueList}
      renderItem={({ body, url, comments, title, id }) => (
        <List.Item>
          <Card title={title}>
            <p>
              <strong>Body:</strong> {body}
            </p>
            <p>
              <strong>Comments:</strong> {comments}
            </p>
            <p>
              <strong>URL:</strong> {url}
            </p>
            <Modal
              issueId={id}
              repoName={repoName}
              handleIssues={handleIssues}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default IssuesList;

