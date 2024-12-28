import readline from "node:readline";
import exportFinancialData from "./src/extractFinancialData";
import { exportESG } from "./src/extractESGScores";
import getSP500Tickers from "./src/extractSNPTickers";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const askQuestion = () => {
    rl.question(
      "What do you want to do? 1- Extract Financial Data, 2- Extract ESG, 3- Extract S&P 500 Companies Tickers, 4- Quit\n",
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
