import getSP500Tickers from "./extractSNPTickers";
import filterExistingTickers from "./utils/findExistingTickers";
import { jsonToCSV } from "./utils/jsonToCSV";

const baseURL = "https://query2.finance.yahoo.com/v1/finance/esgChart";

export async function exportESG() {
  let tickers = await getSP500Tickers();
  tickers = await filterExistingTickers(tickers, "output_esg");
  console.log("\x1b[33m", "Tickers to fetch", tickers);

  // API limit counter
  let calls = 0;

  // Fetch ESG data for each ticker
  for (const ticker of tickers) {
    console.log("\x1b[34m", "Fetching data for", ticker);

    if (calls >= 250) {
      console.log(
        "\x1b[31m",
        "API limit reached. Please wait for 1 minute before continuing."
      );
      await new Promise((resolve) => setTimeout(resolve, 60000));
      calls = 0;
    }

    const esgData = await fetch(`${baseURL}?symbol=${ticker}`);

    calls++;

    if (!esgData.ok) {
      console.log(
        "\x1b[31m",
        `Error fetching data for ${ticker}. Status: ${esgData.status}`
      );
      continue;
    }

    const esgJson = (await esgData.json()) as YahooESGFetchOutput;

    if (
      !esgJson.esgChart ||
      !esgJson.esgChart.result[0] ||
      !esgJson.esgChart.result[0].symbolSeries ||
      !esgJson.esgChart.result[0].peerSeries
    ) {
      console.log("\x1b[31m", `No ESG data found for ${ticker}`);
      continue;
    }

    const resultData: Array<ESGData> =
      esgJson.esgChart.result[0].symbolSeries.timestamp.map(
        (timestamp, index) => ({
          date: new Date(timestamp * 1000).toISOString(),
          symbol: ticker,
          peerGroup: esgJson.esgChart.result[0].peerGroup,
          environmentScore:
            esgJson.esgChart.result[0].symbolSeries.environmentScore[index],
          socialScore:
            esgJson.esgChart.result[0].symbolSeries.socialScore[index],
          governanceScore:
            esgJson.esgChart.result[0].symbolSeries.governanceScore[index],
          esgScore: esgJson.esgChart.result[0].symbolSeries.esgScore[index],
          peerESGScore: esgJson.esgChart.result[0].peerSeries.esgScore[index],
          peerEnvironmentScore:
            esgJson.esgChart.result[0].peerSeries.environmentScore[index],
          peerSocialScore:
            esgJson.esgChart.result[0].peerSeries.socialScore[index],
          peerGovernanceScore:
            esgJson.esgChart.result[0].peerSeries.governanceScore[index],
        })
      );

    jsonToCSV(resultData, ticker, "esg", "output_esg");

    console.log(
      "\x1b[32m",
      `ESG Data for ${ticker} has been fetched and saved as CSV`
    );
  }
}
