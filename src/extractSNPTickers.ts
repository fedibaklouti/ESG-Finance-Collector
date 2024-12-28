import { writeFile } from "fs";

// Function to fetch and parse CSV data
async function fetchSP500Tickers() {
  const response = await fetch(
    "https://datahub.io/core/s-and-p-500-companies/r/constituents.csv"
  );
  const csvData = await response.text();
  return csvData;
}

// Function to parse CSV data into an array of objects
function parseCSV(csvData: string) {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");
  const data = lines.slice(1).map((line: string) => {
    const values = line.split(",");
    const obj = headers.reduce(
      (
        acc: { [x: string]: any },
        header: string | number,
        index: string | number
      ) => {
        acc[header] = values[index as any];
        return acc;
      },
      {}
    );
    return obj;
  });
  return data;
}

// Function to extract ticker symbols
function extractTickers(data: any[]) {
  return data.map((company: { Symbol: any }) => company.Symbol);
}

// Main function to get S&P 500 ticker symbols
export default async function getSP500Tickers(): Promise<string[]> {
  const csvData = await fetchSP500Tickers();
  const parsedData = parseCSV(csvData);
  const tickers = extractTickers(parsedData);
  writeFile("sp500-tickers.json", JSON.stringify(tickers), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
  return tickers;
}
