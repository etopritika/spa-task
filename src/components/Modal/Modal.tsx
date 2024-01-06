import React, { useState } from "react";
import { Button, Modal } from "antd";
import { addCommentToIssue } from "../../services/github_graphql";
import { fetchIssuesForRepository } from "../../services/github_graphql";
import type { Issue } from "../../types/issue";

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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
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
        <textarea
          name="Add a comment"
          id="Add a comment"
          onChange={(e) => setCommentText(e.target.value)}
          style={{ width: "452px", resize: "none", padding: "10px" }}
          rows={10}
        ></textarea>
      </Modal>
    </>
  );
};

export default ModalContainer;
