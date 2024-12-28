type DiscountingCashFlowsOutput = {
  originalCurrency: string;
  convertedCurrency: string;
  report: [
    {
      [x: string]: any;
    }
  ];
};

type YahooESGFetchOutput = {
  esgChart: {
    result: [
      {
        peerGroup: string;
        symbolSeries: {
          timestamp: number[];
          esgScore: number[];
          environmentScore: number[];
          socialScore: number[];
          governanceScore: number[];
        };
        peerSeries: {
          timestamp: number[];
          esgScore: number[];
          environmentScore: number[];
          socialScore: number[];
          governanceScore: number[];
        };
      }
    ];
    error: {
      code: string;
      description: string;
    } | null;
  };
};

type ESGData = {
  date: string;
  symbol: string;
  peerGroup: string;
  esgScore: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  peerESGScore: number;
  peerEnvironmentScore: number;
  peerSocialScore: number;
  peerGovernanceScore: number;
};
