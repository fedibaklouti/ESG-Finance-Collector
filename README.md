# S&P 500 Financial & ESG Data Extractor

This tool was developed as part of my master's project. It is designed to simplify the extraction of financial and ESG data for S&P 500 companies, enabling efficient analysis and research.

## Features

- **Historical Quarterly Financial Data Extraction:**  
  Extract historical quarterly financial data for S&P 500 companies, including:
  - Balance sheets
  - Cash flow statements
  - Financial ratios
  - Dividends
  
  Data is exported to CSV files for easy integration and analysis.

- **Historical Monthly Sustainability Data Extraction:**  
  Extract historical monthly sustainability data, including:
  - ESG scores for each company
  - ESG scores for their peer groups
  
  Data is exported to CSV files.

- **S&P 500 Tickers Extraction:**  
  Extract the list of S&P 500 company tickers and save them to a JSON file.

## Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/fedibaklouti/ESG-Finance-Collector.git
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the tool to extract the desired data:
   ```bash
   npm run start
   ```
4. Select an option from the menu:
   - `1` to Extract Financial Data
   - `2` to Extract ESG Data
   - `3` to Extract S&P 500 Companies Tickers
   - `4` to Quit
5. You'll find that the data is extracted in either output or output_esg folder depending on your choice

Please note that you'll extract a limited amount of financial data without an API key from discountingcashflows.com; so get yours and add it to `.env` under the variable name `DISCOUNTING_CASHFLOW_API_KEY`.


## Data sources
 - Financial Data: [Discounting Cashflows](https://discountingcashflows.com/)
 - ESG Scores: [Yahoo Finance](https://finance.yahoo.com/)
 - Tickers: [S&P 500 Companies Dataset](https://github.com/datasets/s-and-p-500-companies)
