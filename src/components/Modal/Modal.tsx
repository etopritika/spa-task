import React, { useState } from "react";

import { Button, Modal } from "antd";
import { Input } from 'antd';

import { addCommentToIssue } from "../../services/github_graphql";
import { fetchIssuesForRepository } from "../../services/github_graphql";
import type { Issue } from "../../types/types";

const { TextArea } = Input;

interface ModalProps {
  issueId: number;
  repoName: string;
  handleIssues: (issues: Issue[]) => void;
}

const ModalContainer: React.FC<ModalProps> = ({
  issueId,
  repoName,
  handleIssues,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await addCommentToIssue(issueId, commentText);
    const issues = await fetchIssuesForRepository(repoName);
    handleIssues(issues);
    setCommentText("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{
          margin: "20px 0 0 0",
        }}
        type="primary"
        onClick={showModal}
      >
        Add a comment
      </Button>
      <Modal
        title="Leave your comment here"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea name="Add a comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{ resize: "none" }}  rows={10} placeholder="Text..." maxLength={500}/>
      </Modal>
    </>
  );
};

export default ModalContainer;
