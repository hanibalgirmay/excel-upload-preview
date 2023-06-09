import React, { useState } from "react";
import type { FC } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import * as XLSX from "xlsx";

const { Dragger } = Upload;

const DragDrop: FC = () => {
  const [excelData, setExcelData] = useState(null);
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // dataList(newFileList);
    setFiles(newFileList);
    console.log("dragDrop", newFileList);
  };

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
    // action: "#",
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
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop: (e) => {
      e.preventDefault();
      console.log("Dropped files", e.dataTransfer.files);
      handleUpload(e.dataTransfer.files[0]);
    },
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
      console.log("excel data: ", excelData);
      // tableData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Dragger style={{ height: "100%" }} {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single upload. Strictly prohibited from uploading other
        format other that excel or csv file
      </p>
    </Dragger>
  );
};

export default DragDrop;
