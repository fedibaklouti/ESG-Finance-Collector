import { readdir } from "fs";

export default async function filterExistingTickers(
  tickers: string[],
  dir: string
) {
  const filesInOutputDir = await new Promise<Array<string>>(
    (resolve, reject) => {
      readdir(dir, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    }
  );

  const tickersFromFile = filesInOutputDir.map((file) => file.split("_")[0]);
  // REMOVE REPEATED
  const filtered = tickersFromFile.filter((ticker, index) => {
    return tickersFromFile.indexOf(ticker) === index;
  });

  return tickers.filter(
    (ticker) => !filtered.includes(ticker) && ticker.length > 0
  );
}
