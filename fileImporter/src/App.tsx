import { useEffect, useState } from "react";
import type { FC } from "react";
import { Button } from "antd";
import "./App.css";
import "antd/dist/reset.css";
import { Col, Row } from "antd";
import MainLayout from "./layout/MainLayout";
import DragDrop from "./components/DragDrop";
import CustomTable from "./components/Table";
import { read, utils } from "xlsx";
import axios from "axios";

const App: FC = () => {
  const [count, setCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:4500/api")
      .then((res) => {
        console.log(res.data);
        setFileList(res.data.data);
      })
      .catch((er) => console.log(er));
  };

  // console.log(fileList);
  const readFile = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = read(fileList);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        settableData(rows);
      }
    };
    reader.readAsArrayBuffer(fileList[0]);
  };

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <MainLayout>
      <Row
        style={{ margin: "1rem", height: "70vh", display: "flex" }}
        align={"stretch"}
        justify={"center"}
      >
        <Col span={8}>
          <DragDrop />
        </Col>
        <Col span={16}>
          <CustomTable data={fileList} />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default App;
