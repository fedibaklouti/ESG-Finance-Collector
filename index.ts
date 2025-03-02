import readline from "node:readline";
import exportFinancialData from "./src/extractFinancialData";
import { exportESG } from "./src/extractESGScores";
import getSP500Tickers from "./src/extractSNPTickers";
import { mkdir } from "node:fs";
import exportESGFMP from "./src/extractESGScoresFMP";
import { API_KEY, API_KEY_FMP } from "./data/config";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("ESG Finance Collector by Fedi Baklouti\n");
  console.log("Your API Keys:");
  console.log("Discounting Cash Flows: ", API_KEY || "No API Key");
  console.log("https://discountingcashflows.com/");
  console.log("Financial Modeling Prep: ", API_KEY_FMP || "No API Key");
  console.log("https://financialmodelingprep.com/\n");

  mkdir("output", (err) => {
    if (err && err.code !== "EEXIST") {
      console.log("Error creating output directory");
    }
  });
  mkdir("output_esg", (err) => {
    if (err && err.code !== "EEXIST") {
      console.log("Error creating output_esg directory");
    }
  });

  const askQuestion = () => {
    rl.question(
      "\n_________________________________________________________________________________\n\nWhat do you want to do?\n 1 - Extract Financial Data from Discounting Cash Flows (API KEY REQUIRED)\n 2 - Extract ESG From Yahoo Finance\n 3 - Extract S&P 500 Companies Tickers\n 4 - Extract ESG from Financial Modeling Prep (API KEY REQUIRED)\n 5 - Quit\n_________________________________________________________________________________\n\n",
      async (answer) => {
        if (answer === "1") {
          await exportFinancialData();
        } else if (answer === "2") {
          await exportESG();
        } else if (answer === "3") {
          await getSP500Tickers();
          console.log("JSON with S&P 500 companies tickers has been created");
        } else if (answer === "4") {
          await exportESGFMP();
        } else if (answer === "5") {
          console.log("Quitting...");
          rl.close();
          return;
        } else {
          console.log("Invalid option");
        }
        askQuestion();
      }
    );
  };
  askQuestion();
}

main();
