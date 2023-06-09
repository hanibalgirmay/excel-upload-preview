import { useState } from "react";
import type { FC } from "react";
import { Button } from "antd";
import "./App.css";
import "antd/dist/reset.css";
import { Col, Row } from 'antd';
import MainLayout from "./layout/MainLayout";
import DragDrop from "./components/DragDrop";
import CustomTable from "./components/Table";

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <Row style={{margin:'1rem' ,height:'80vh'}} align={"stretch"} justify={"center"}>
        <Col span={8}>
          <DragDrop />
        </Col>
        <Col span={16}>
          <CustomTable />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default App;
