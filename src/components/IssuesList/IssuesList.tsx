import React, { useState, useEffect } from "react";

import { Card, List, Button } from "antd";
import Modal from "../Modal/Modal";

import type { Issue } from "../../types/types";
import { fetchIssueWithComments } from "../../services/github_graphql";
import "./IssuesList.css";

interface IssueListProps {
  list: Issue[];
  repoName: string;
}

type Comments = {
  label: string;
  key: number;
};

const IssuesList: React.FC<IssueListProps> = ({ list, repoName }) => {
  const [issueList, setIssueList] = useState<Issue[]>([...list]);
  const [commentList, setCommentlist] = useState<Comments[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const handleCommentList = (list: Issue[]) => {
    setIssueList([...list])
  }

  const handleComments = async (issueNumber: number) => {
    if (selectedIssue !== issueNumber) {
      setCommentlist([]);
      setSelectedIssue(issueNumber);

      const repoComments = await fetchIssueWithComments(repoName, issueNumber);
      const editedComments = repoComments.map((comment, index) => ({
        label: comment.body || "",
        key: index,
      }));

      setCommentlist([...editedComments]);
    } else {
      setSelectedIssue(null);
    }
  };

  useEffect(() => {
    setIssueList(list);
  }, [list]);

  return (
    <List
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
          <Modal issueId={id} repoName={repoName} handleCommentList={handleCommentList}/>
          <Button onClick={() => handleComments(number)}>Show Comments</Button>

          {selectedIssue === number && (
            <List
              dataSource={commentList}
              renderItem={(comment: any) => (
                <List.Item>
                  {comment.key + 1}: {comment.label}
                </List.Item>
              )}
            />
          )}
        </Card>
      )}
    />
  );
};

export default IssuesList;
