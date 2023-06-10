import React, { useState } from "react";
import {
  Table,
  Pagination,
  Menu,
  Dropdown,
  Button,
  Form,
  Input,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DownOutlined,
  ExpandAltOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import CustomModal from "./Modal";
import axios from "axios";

interface DataType {
  key: React.Key;
  rate: number;
  amount: number;
  quantity: string;
  description: string;
}

const MyButton = ({ onButton, btnData }) => {
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => onButton({ ...btnData, type: "update" })}
        key="update"
      >
        Update
      </Menu.Item>
      <Menu.Item
        onClick={() => onButton({ ...btnData, type: "delete" })}
        key="delete"
      >
        Delete
      </Menu.Item>
      {/* <Menu.Item key="3">Option 3</Menu.Item> */}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        shape="circle"
        icon={<DownOutlined />}
        style={{ marginRight: 8 }}
      />
    </Dropdown>
  );
};

type LayoutType = Parameters<typeof Form>[0]["layout"];

const CustomTable: React.FC = ({ data, onChangeExpand, show, loading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [modalContent, setModalContent] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    setExpandedRowKeys(selectedRowKeys);
    console.log(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (t) => t.substring(0, 15),
    },
    Table.EXPAND_COLUMN,
    { title: "Rate", dataIndex: "rate", key: "rate" },
    // Table.SELECTION_COLUMN,
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      render: (r) => <MyButton onButton={handleButtonClick} btnData={r} />,
    },
  ];

  const handleButtonClick = (e) => {
    console.log("clicked: ", e);
    setModalContent(e);
    if (e.type === "update") {
      setIsModalOpen(true);
    }
    if (e.type === "delete") {
      setDelModal(true);
    }
  };

  const handleRowSelection = (selectedRowKeys, selectedRow) => {
    setSelectedRow(selectedRow);
  };

  const handleToggleShow = () => {
    onChangeExpand(!show);
  };

  const handleSubmit = async (formD) => {
    console.log(formD);
    let _da = {
      ...formD,
      rate: Number(formD.rate),
      amount: Number(formD.amount),
      quantity: Number(formD.quantity),
    };
    await axios
      .put("http://localhost:6500/api/update/" + modalContent?.id, _da)
      .then((res) => [
        console.log("Data Updated Successfully"),
        message.success("Data Updated Successfully"),
      ])
      .catch((err) => {
        console.log(err), message.error("something is wrong, try again!");
      })
      .finally(() => setIsModalOpen(false));
  };

  return (
    <div style={{ overflowY: "scroll" }}>
      <div
        onClick={handleToggleShow}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {!show ? (
          <FullscreenOutlined
            size={18}
            style={{
              background: "lightgray",
              cursor: "pointer",
              padding: ".4rem .6rem",
              borderRadius: "5px",
            }}
          />
        ) : (
          <FullscreenExitOutlined
            size={18}
            style={{
              background: "lightgray",
              cursor: "pointer",
              padding: ".4rem .6rem",
              borderRadius: "5px",
            }}
          />
        )}
      </div>
      <Table
        columns={columns}
        loading={loading}
        key={"id"}
        indentSize={5}
        rowKey="id"
        rowSelection={rowSelection}
        style={{ height: "100%", paddingBottom: "3rem" }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={data}
      />

      <CustomModal
        setIsModalOpen={setDelModal}
        isModalOpen={delModal}
        data={modalContent}
        title={"Delete Data"}
        // handleReload={data}
      >
        <p>Are you sure you want to delete this record?</p>
      </CustomModal>

      <CustomModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        data={modalContent}
        title={"Edit Data"}
      >
        {/* <p>Edit Content?</p> */}
        <Form
          layout={formLayout}
          form={form}
          onFinish={handleSubmit}
          initialValues={{ layout: modalContent }}
          // onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item
            initialValue={modalContent?.amount}
            name="amount"
            label="Amount"
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item name="rate" initialValue={modalContent?.rate} label="Rate">
            <Input type="number" />
          </Form.Item>
          <div>
            <Form.Item
              name="quantity"
              initialValue={modalContent?.quantity}
              label="Quantity"
            >
              <Input type="number" />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            initialValue={modalContent?.description}
            label="Description"
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};

export default CustomTable;
