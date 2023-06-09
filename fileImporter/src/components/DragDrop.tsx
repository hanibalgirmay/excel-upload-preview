import React, { useState } from "react";
import type { FC } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const DragDrop: FC = ({dataList}) => {
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

    dataList(newFileList);
    setFiles(newFileList);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleChange
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    // onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
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
