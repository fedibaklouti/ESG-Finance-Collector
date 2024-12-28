import readline from "node:readline";
import exportFinancialData from "./src/extractFinancialData";
import { exportESG } from "./src/extractESGScores";
import getSP500Tickers from "./src/extractSNPTickers";
import { mkdir } from "node:fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
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
      "ESG Finance Collector by Fedi Baklouti\nWhat do you want to do?\n 1- Extract Financial Data\n 2- Extract ESG\n 3- Extract S&P 500 Companies Tickers\n 4- Quit\n",
      async (answer) => {
        if (answer === "1") {
          await exportFinancialData();
        } else if (answer === "2") {
          await exportESG();
        } else if (answer === "3") {
          await getSP500Tickers();
          console.log("JSON with S&P 500 companies tickers has been created");
        } else if (answer === "4") {
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
