"use client";

import React from "react";
import { Modal } from "antd"; // Assuming you're using Ant Design for modals
import useModalStore from "@/store/useModalStore";

const ModalController = () => {
  const { isOpen, title, content, closeModal, width } = useModalStore();

  return (
    <>
      <Modal
        open={isOpen}
        title={title}
        onCancel={closeModal}
        width={width}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
};

export default ModalController;
