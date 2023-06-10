import { useEffect, useState } from "react";
import type { FC } from "react";
import { Button, message, Upload } from "antd";
import "./App.css";
import "antd/dist/reset.css";
import { Col, Row } from "antd";
import MainLayout from "./layout/MainLayout";
import DragDrop from "./components/DragDrop";
import CustomTable from "./components/Table";
import { read, utils } from "xlsx";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const App: FC = () => {
  const [count, setCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [expand, setExpand] = useState(true);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: {
      showRemoveIcon: true,
      showDownloadIcon: false,
      showPreviewIcon: false,
    },
    supportServerRender: false,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    action: "http://localhost:6500/api/upload/create",
    beforeUpload: (file) => {
      const isExcel =
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === ".csv";
      if (!isExcel) {
        message.error("You can only upload Excel and CSV files!");
      }
      return isExcel;
    },
    // onChange: handleChange
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        getData();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const getData = async () => {
    setLoading(true);
    setTimeout(async () => {
      await axios
        .get("http://localhost:6500/api")
        .then((res) => {
          console.log(res.data);
          setFileList(res.data.data);
        })
        .catch((er) => console.log(er))
        .finally(() => setLoading(false));
    }, 3000);
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
  }, []);

  const handleExpand = (ex) => {
    console.log(expand);
    setExpand(ex);
  };

  return (
    <MainLayout>
      {!expand && (
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )}
      <Row
        style={{ margin: "1rem", display: "flex" }}
        align={"stretch"}
        justify={"center"}
      >
        {/* {!expand && ( */}
        <Col span={expand ? 8 : 0}>
          <div style={{ position: "fixed", width: "28%" }}>
            <DragDrop reload={getData} />
          </div>
        </Col>
        {/* )} */}
        <Col span={expand ? 16 : 24}>
          <CustomTable
            show={expand}
            loading={loading}
            onChangeExpand={handleExpand}
            data={fileList}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default App;
