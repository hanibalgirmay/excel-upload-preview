import React, { useState } from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  ExpandAltOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

interface DataType {
  key: React.Key;
  rate: number;
  amount: number;
  quantity: string;
  description: string;
}



const expandedRowRender = (record) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div onClick={handleExpand}>
        {/* content to display when row is expanded */}
      </div>
      {expanded && (
        <div>
          {/* additional content to display when row is expanded */}
        </div>
      )}
    </div>
  );
};


const CustomTable: React.FC = ({ data, onChangeExpand, show, loading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
];

const handleRowSelection = (selectedRowKeys, selectedRow) => {
  setSelectedRow(selectedRow);
};

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: handleRowSelection,
  // };
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(5);
  // const [totalRows, setTotalRows] = useState(0);

  const handleToggleShow = () => {
    onChangeExpand(!show);
  };

  return (
    <div style={{overflowY: 'scroll'}}>
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
        style={{ height: "100%", paddingBottom:'3rem' }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          // expandedRowKeys,
          // onExpand: (expanded, record) => {
          //   console.log(expanded, record)
          //   const keys = expanded ? [record.key] : [];
          //   setExpandedRowKeys(keys);
          // },
        }}
        dataSource={data}
      />
      {/* <Pagination {...paginationConfig} /> */}
    </div>
  );
};

export default CustomTable;
