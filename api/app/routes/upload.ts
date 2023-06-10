import { Router, Request, Response } from "express";
import upload from "../db/upload";
import csv from "csv-parser";
import xlsx from "xlsx";
import nodeXlsx from "node-xlsx";
import * as service from "../services/FileUpload.services";
import FileUpload from "../models/File.mode";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "upload api is running..." });
});

router.post(
  "/create",
  upload.single("file"),
  async (req: Request, res: Response) => {
    let fileData: any[];
    let r: any = [];
    try {
      if (req.file == undefined) {
        return res
          .status(400)
          .json({ message: "Please upload a CSV of EXCEL file!" });
      }
      if (req.file.mimetype === "text/csv") {
        // fileData = await parseCSV(req.file.buffer);
      } else {
       
        fileData = await nodeXlsx.parse(req.file.buffer);
        // console.log("fileData ", fileData);
        fileData.map((element) => {
          element.data.forEach(async (item: any[]) => {
            if (item.length >= 6 && typeof item[5] === "number") {
              let w = {
                itemNo: item[0],
                description: item[1],
                unit: item[2],
                quantity: item[3],
                rate: item[4],
                amount: item[5],
              };

              r.push(w);
              await service.create(w);
            }
          });
        });
        // console.log(r);

        // res.json(r);
        // fileData?.map((element) => {
        //   let w = {
        //     itemNo: element[0],
        //     description: element[1],
        //     unit: element[2],
        //     quantity: element[3],
        //     rate: element[4],
        //     amount: element[5],
        //   };
        //   r.push(w);
        // });
      }
      return res.json({ message: "Data Created Successfull" });
    } catch (error) {
      console.log("error");
    }
    // res.status(200).json({ message: "upload api is running..." })
  }
);

// CSV parser function
// const parseCSV = (buffer: Buffer): Promise<any[]> => {
//     return new Promise((resolve, reject) => {
//       const results: any[] = [];
//       const stream = buffer.pipe(csv());
//       stream
//         // .on('data', (data) => results.push(data))
//         .on('end', () => resolve(results))
//         .on('error', () => reject("error"));
//     });
//   };

// Excel parser function
const parseExcel = (buffer: Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const workbook = xlsx.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const results: any[] = xlsx.utils.sheet_to_json(worksheet);
    resolve(results);
  });
};

export default router;
