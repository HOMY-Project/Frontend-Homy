import React from 'react';
import { Button, Modal } from 'antd';

const HomyModal = ({ content, btnText, ModalTitle,isModalVisible, setIsModalVisible, SubmitBtn }) => {

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
     <Button type="primary" onClick={showModal}>
        {btnText}
      </Button>
      <Modal title={ModalTitle} visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
      footer={[
        null
        // SubmitBtn()
      ]}
      >
        {content}
      </Modal>
    </>
  );
};

export default HomyModal;