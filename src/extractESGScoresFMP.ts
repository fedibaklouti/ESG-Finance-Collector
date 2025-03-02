import { API_KEY_FMP } from "../data/config";
import { jsonToCSV } from "./utils/jsonToCSV";
import getSP500Tickers from "./extractSNPTickers";
import filterExistingTickers from "./utils/findExistingTickers";

const baseURL = "https://financialmodelingprep.com/stable/esg-disclosures";

export default async function exportESGFMP() {
  let tickers = await getSP500Tickers();
  tickers = await filterExistingTickers(tickers, "output_esg_v2");

  console.log("\x1b[33m", "Tickers to fetch", tickers);

  // API limit counter
  let calls = 0;

  // Fetch financial data for each ticker

  for (const ticker of tickers) {
    console.log("\x1b[34m", "Fetching data for", ticker);

    if (calls >= 300) {
      console.log(
        "\x1b[31m",
        "API limit reached. Please wait for 1 minute before continuing."
      );
      await new Promise((resolve) => setTimeout(resolve, 60000));
      calls = 0;
    }

    const esgData = await fetch(
      `${baseURL}/?symbol=${ticker}&apikey=${API_KEY_FMP}`
    );

    calls += 1;

    if (!esgData.ok) {
      console.log(
        "\x1b[31m",
        `Error fetching data for ${ticker}. Status: ${esgData.status}`
      );
      continue;
    }

    await esgData.json().then((data) => {
      jsonToCSV(data, ticker, "esg", "output_esg_v2");
    });

    console.log(
      "\x1b[32m",
      `All data for ${ticker} has been fetched and saved to CSV`
    );
  }
}
