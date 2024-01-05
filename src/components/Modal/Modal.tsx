import React, { useState } from "react";
import { Button, Modal } from "antd";

const ModalContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
          style={{ width: "452px", resize: "none", padding: "10px" }}
          rows={10}
        ></textarea>
      </Modal>
    </>
  );
};

export default ModalContainer;
