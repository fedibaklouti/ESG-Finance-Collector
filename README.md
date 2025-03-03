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
   - `1` to Extract Financial Data from Discounting Cashflows (Requires API Key for full data)
   - `2` to Extract ESG Data from Yahoo Finance
   - `3` to Extract S&P 500 Companies Tickers
   - `4` to Extract ESG Data from FMP (Requires API Key for full data)
   - `5` to Quit
5. You'll find that the data is extracted in either output/output_esg/output_esg_v2 folder depending on your choice

Please note that you'll extract a limited amount of financial data without an API key from discountingcashflows.com; so get yours and add it to `.env` under the variable name `DISCOUNTING_CASHFLOW_API_KEY`. Visit [this page](https://discountingcashflows.com/documentation/financial-api-guide/#getting-an-api-key) for more details.

As for ESG Data from FMP, you need an **API key** from them; Add it to `.env` under the variable name `FMP_API_KEY`. Visit [this page](https://site.financialmodelingprep.com/developer/docs) for more details.



## Data sources
 - Financial Data: [Discounting Cashflows](https://discountingcashflows.com/)
 - ESG Scores: [Yahoo Finance](https://finance.yahoo.com/)
 - Tickers: [S&P 500 Companies Dataset](https://github.com/datasets/s-and-p-500-companies)
 - FMP ESG Scores: [Financial Modeling Prep](https://site.financialmodelingprep.com/)

## Changelogs
   02/03/2025: Added possibility to extract historical ESG data from Financial Modeling Prep
