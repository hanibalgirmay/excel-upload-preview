import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";

const CustomModal: React.FC = ({
  title,
  children,
  isModalOpen,
  data,
  setIsModalOpen,
}) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (data?.type === "delete") {
      console.log("deleted");
      await axios
        .delete("http://localhost:6500/api/delete/" + data.id)
        .then((res) => {
          //   console.log(res.data);
          message.info("Data Deleted Successfully"), setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err), message.error("Unable to delete");
        })
        .finally(() => setIsModalOpen(false));
    }
    if (data?.type === "update") {
      console.log("updated");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    console.log("cancel ", data);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* <Button type="primary" >
        {title}
      </Button> */}
      <Modal
        title={title}
        open={isModalOpen}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
