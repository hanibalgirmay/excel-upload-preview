import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  rate: number;
  amount: number;
  quantity: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Description", dataIndex: "description", key: "description", render: (t) => t.substring(0,12)  },
  Table.EXPAND_COLUMN,
  { title: "Rate", dataIndex: "rate", key: "rate" },
  // Table.SELECTION_COLUMN,
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
];

const data: DataType[] = [
  {
    key: 1,
    rate: 4,
    amount: 32,
    quantity: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    rate: 4.2,
    amount: 533,
    quantity: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    rate: 2,
    amount: 229,
    quantity: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    rate:3.2,
    amount: 932,
    quantity: "Sydney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];

const CustomTable: React.FC = ({data}) => {
  console.log("table", data)
  return (
    <Table
      columns={columns}
      rowSelection={{}}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.description}</p>
        ),
      }}
      dataSource={data}
    />
  )
}


export default CustomTable;
