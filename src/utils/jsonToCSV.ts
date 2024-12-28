import { writeFile } from "fs";

export function jsonToCSV(
  data: Array<{
    [x: string]: any;
  }>,
  ticker: string,
  type: string,
  output = "output"
) {
  if (!data || !Array.isArray(data) || data.length === 0 || !ticker || !type) {
    console.log("\x1b[33m", "No data to write to CSV");
    return;
  }
  const headers = Object.keys(data[0]);
  const csv = [headers.join(",")];
  data.forEach((obj) => {
    const values = headers.map((header) => obj[header]);
    csv.push(values.join(","));
  });

  const filename = `${output}/${ticker}_${type}.csv`;

  try {
    writeFile(filename, csv.join("\n"), (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("\x1b[32m", `CSV file saved as ${filename}`);
      }
    });
  } catch (err) {
    console.log(err);
  }

  return;
}
