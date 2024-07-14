import { db } from "../config/db.js";
import { createNotenspiegel } from "../functions/notenspiegel.js";
import puppeteer from "puppeteer";

const getNotenspiegel = (req, res) => {
  const sqlQuery = `
  SELECT *
  FROM Notenspiegel n
  WHERE studentId ='${req.student.id}'
  ORDER BY  semester DESC, versuch ASC;
  `;
  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).json(err); // 500: internel server error
    if (data.length) {
      const notenspiegelList = createNotenspiegel(data);

      return res.status(200).json({
        success: true,
        notenspiegel: notenspiegelList,
      });
    } else {
      return res.json({
        success: false,
        message: "no records found",
      });
    }
  });
};

const generatePdf = async (req, res) => {
  const htmlContent = req.body.htmlContent;

  const browser = await puppeteer.launch({
    headless: "new", // Opt into the new headless mode
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=table.pdf");
  res.send(pdfBuffer);

  await browser.close();
};

export { getNotenspiegel, generatePdf };
