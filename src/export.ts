/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firestore";
import * as XLSX from "xlsx-js-style";

async function exportExperimentsToExcel() {
  const snapshot = await getDocs(collection(db, "experiments"));

  const rows = snapshot.docs.map((doc) => {
    const data = doc.data();

    // Flatten answers into q1, q2, q3...
    const flatAnswers = Object.fromEntries(
      (data.answers || []).map((a: any) => [
        `Q ${a.questionId}`,
        Array.isArray(a.answer)
          ? a.answer.join("; ") // for checkbox answers
          : (a.answer ?? ""),
      ]),
    );

    return {
      experimentId: data.experimentId,
      experimentType: data.experimentType,
      startTime: formatDate(data.startTime?.toDate?.()),
      endTime: formatDate(data.endTime?.toDate?.()),
      duration : data.startTime && data.endTime
        ? Math.round(
            (data.endTime.toDate().getTime() - data.startTime.toDate().getTime()) / 1000,
          )
        : "",
      ...flatAnswers,
    };
  });

  const allRows = rows;

const descriptiveRows = rows.filter(
  (r) => r.experimentType === "descriptive"
);

const prescriptiveRows = rows.filter(
  (r) => r.experimentType === "prescriptive"
);


  // Convert to Excel
const worksheet = XLSX.utils.json_to_sheet(rows);

// Get column headers
const headers = Object.keys(rows[0]);

// Apply header styling
headers.forEach((_, colIndex) => {
  const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });

  if (!worksheet[cellAddress]) return;

  worksheet[cellAddress].s = {
    font: {
      bold: true,
      color: { rgb: "FFFFFF" }
    },
    fill: {
      fgColor: { rgb: "4472C4" } // blue background
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
      wrapText: true
    }
  };
});

const range = XLSX.utils.decode_range(worksheet["!ref"] || "");

for (let R = 1; R <= range.e.r; ++R) {
  for (let C = 0; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });

    if (!worksheet[cellAddress]) continue;

    worksheet[cellAddress].s = {
      alignment: {
        wrapText: true,
        vertical: "top"
      }
    };
  }
}

worksheet["!cols"] = headers.map((_, index) => {
  if (index >= 1 && index <= 3) {
    return { wch: 15 }; // B, C, D
  }

  return { wch: 30 }; // default width for others
});


const workbook = XLSX.utils.book_new();
createStyledSheet(allRows, "All", workbook);
createStyledSheet(descriptiveRows, "Descriptive", workbook);
createStyledSheet(prescriptiveRows, "Prescriptive", workbook);

// Generate binary Excel file
const excelBuffer = XLSX.write(workbook, {
  bookType: "xlsx",
  type: "array",
});

// Create Blob
const blob = new Blob([excelBuffer], {
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

// Create download link
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "experiments.xlsx";

// Trigger download
document.body.appendChild(link);
link.click();

// Cleanup
document.body.removeChild(link);
URL.revokeObjectURL(url);

}

function formatDate(date: Date | undefined) {
  if (!date) return "";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function createStyledSheet(data: any[], sheetName: string, workbook: XLSX.WorkBook) {
  if (data.length === 0) return;

  const ws = XLSX.utils.json_to_sheet(data);

  const headers = Object.keys(data[0]);

  // Header styling
  headers.forEach((_, colIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    if (!ws[cellAddress]) return;

    ws[cellAddress].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4472C4" } },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
    };
  });

  ws["!cols"] = headers.map((_, index) => {
    if (index >= 1 && index <= 3) return { wch: 15 };
    return { wch: 30 };
  });

  XLSX.utils.book_append_sheet(workbook, ws, sheetName);
}

export { exportExperimentsToExcel };
