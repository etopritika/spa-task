import React, { useState, useEffect } from "react";

import { Card, List, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Modal from "../Modal/Modal";

import type { Issue } from "../../types/types";
import { fetchIssueWithComments } from "../../services/github_graphql";
import "./IssuesList.css";

interface IssueListProps {
  list: Issue[];
  repoName: string;
}

const IssuesList: React.FC<IssueListProps> = ({ list, repoName }) => {
  const [issueList, setIssueList] = useState<Issue[]>([...list]);
  const [commentList, setCommentlist] = useState<MenuProps["items"]>([]);

  const handleIssues = (issues: Issue[]) => {
    setIssueList([...issues]);
  };

  const handleComments = async (issueNumber: number) => {
    const repoComments = await fetchIssueWithComments(repoName, issueNumber);

    const editedComments = repoComments.map((comment, index) => ({
      label: comment.body || "",
      key: index.toString(),
    }));

    setCommentlist([...editedComments]);
  };

  useEffect(() => {
    setIssueList(list);
  }, [list]);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={issueList}
      renderItem={({ body, url, comments, title, id, number }) => (
        <Card title={title} className="card">
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
          <Dropdown menu={{}} trigger={["click"]}>
            <button onClick={() => handleComments(number)}>
              <Space>
                Show comments
                <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </Card>
      )}
    />
  );
};

export default IssuesList;
