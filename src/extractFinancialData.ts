import { API_KEY } from "../data/config";
import { jsonToCSV } from "./utils/jsonToCSV";
import getSP500Tickers from "./extractSNPTickers";
import filterExistingTickers from "./utils/findExistingTickers";

const baseURL = "https://discountingcashflows.com/api";

export default async function exportFinancialData() {
  let tickers = await getSP500Tickers();
  tickers = await filterExistingTickers(tickers, "output");

  console.log("\x1b[33m", "Tickers to fetch", tickers);

  // API limit counter
  let calls = 0;

  // Fetch financial data for each ticker

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

    const [
      IncomeStatement,
      BalanceSheet,
      cashFlowStatement,
      ratios,
      dividends,
    ] = await Promise.all([
      fetch(
        `${baseURL}/income-statement/?ticker=${ticker}&period=quarterly&key=${API_KEY}`
      ),
      fetch(
        `${baseURL}/balance-sheet-statement/?ticker=${ticker}&period=quarterly&key=${API_KEY}`
      ),
      fetch(
        `${baseURL}/cash-flow-statement/?ticker=${ticker}&period=quarterly&key=${API_KEY}`
      ),
      fetch(
        `${baseURL}/ratios/?ticker=${ticker}&period=quarterly&key=${API_KEY}`
      ),
      fetch(
        `${baseURL}/dividends/?ticker=${ticker}&period=quarterly&key=${API_KEY}`
      ),
    ]);

    calls += 5;

    if (
      !IncomeStatement.ok ||
      !BalanceSheet.ok ||
      !cashFlowStatement.ok ||
      !ratios.ok ||
      !dividends.ok
    ) {
      console.log(
        "\x1b[31m",
        `Error fetching data for ${ticker}. Status: ${IncomeStatement.status}`
      );
      continue;
    }

    await Promise.all([
      (IncomeStatement.json() as Promise<DiscountingCashFlowsOutput>).then(
        (data) => jsonToCSV(data?.report, ticker, "income_statement")
      ),
      (BalanceSheet.json() as Promise<DiscountingCashFlowsOutput>).then(
        (data) => jsonToCSV(data?.report, ticker, "balance_sheet")
      ),
      (cashFlowStatement.json() as Promise<DiscountingCashFlowsOutput>).then(
        (data) => jsonToCSV(data?.report, ticker, "cash_flow_statement")
      ),
      (ratios.json() as Promise<DiscountingCashFlowsOutput>).then((data) =>
        jsonToCSV(data?.report, ticker, "ratios")
      ),
      (dividends.json() as Promise<DiscountingCashFlowsOutput>).then((data) =>
        jsonToCSV(data?.report, ticker, "dividends")
      ),
    ]);

    console.log(
      "\x1b[32m",
      `All data for ${ticker} has been fetched and saved to CSV`
    );
  }
}
