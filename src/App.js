import React, { useState,useEffect } from "react";
import "./App.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
const BacktestResults = ({ results }) => {
  const [selectedSlippage, setSelectedSlippage] = useState("0%");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const handleSlippageChange = (event) => {
    setSelectedSlippage(event.target.value);
  };

  const filteredBacktests = results.Backtests.filter(
    (backtest) => backtest.Slippage === selectedSlippage
  );

  const getCalmarRatioColor = (calmarRatio) => {
    if (calmarRatio >= 5) return '#008080'; // Dark Blue
    if (calmarRatio >= 4.5) return '#008B8B'; // Blue
    if (calmarRatio >= 4) return '#5F9EA0'; // Intermediate Blue 1
    if (calmarRatio >= 3.5) return '#20B2AA'; // Intermediate Blue 2
    if (calmarRatio >= 3) return '#00CED1'; // Intermediate Blue 3
    if (calmarRatio >= 2.5) return '#48D1CC'; // Intermediate Blue 4
    if (calmarRatio >= 2) return '#40E0D0'; // Intermediate Blue 5
    if (calmarRatio >= 1.5) return '#66CDAA'; 
    if (calmarRatio >= 1) return '#7FFFD4'; // Intermediate Blue 6
    if (calmarRatio >= 0.5) return '#AFEEEE'; // Intermediate Blue 6
    return '#ffffff'; // White
  };

  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    filteredBacktests.forEach((backtest) => {
      backtest.Results = sortData(backtest.Results, sortConfig.key, sortConfig.direction);
    });
  }, [sortConfig, filteredBacktests]);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "↕";
  };

  return (
    <div className="navbar">
      <h2 className="backtest-heading">Backtest Results</h2>
      <div className="slippage-select-container">
        <label htmlFor="slippage-select" className="slippage-label">
          Slippage:{" "}
        </label>
        <select
          id="slippage-select"
          value={selectedSlippage}
          onChange={handleSlippageChange}
          className="slippage-select"
        >
          <option value="0%">0%</option>
          <option value="0.5%">0.5%</option>
          <option value="1%">1%</option>
        </select>
      </div>
      {filteredBacktests.map((backtest, index) => (
        <div key={index}>
          <Table>
            <caption>Basic Backtest</caption>
            <Thead>
              <Tr>
                <Th scope="col" onClick={() => handleSort("Rank")}>
                  Rank {getSortIcon("Rank")}
                </Th>
                <Th scope="col" onClick={() => handleSort("Name")}>
                  Name {getSortIcon("Name")}
                </Th>
                <Th scope="col" onClick={() => handleSort("CalmarRatio")}>
                  Calmar Ratio {getSortIcon("CalmarRatio")}
                </Th>
                <Th scope="col" onClick={() => handleSort("OverallProfit")}>
                  Overall Profit {getSortIcon("OverallProfit")}
                </Th>
                <Th scope="col" onClick={() => handleSort("AvgDailyProfit")}>
                  Average Daily Profit {getSortIcon("AvgDailyProfit")}
                </Th>
                <Th scope="col" onClick={() => handleSort("Win %(Day)")}>
                  Win % per Day {getSortIcon("Win %(Day)")}
                </Th>
                <Th scope="col" onClick={() => handleSort("Price")}>
                  Price (Rs) {getSortIcon("Price")}
                </Th>
                <Th scope="col">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {backtest.Results.map((result, idx) => (
                <Tr key={idx}>
                  <Td scope="row" data-label="Rank">
                    {result.Rank}
                  </Td>
                  <Td data-label="Name">{result.Name}</Td>
                  <Td
                    style={{ backgroundColor: getCalmarRatioColor(result.CalmarRatio) }}
                    data-label="Calmar Ratio"
                  >
                    {result.CalmarRatio}
                  </Td>
                  <Td data-label="Overall Profit">{result.OverallProfit}</Td>
                  <Td data-label="Average Daily Profit">{result.AvgDailyProfit}</Td>
                  <Td data-label="Win % per Day">{result["Win %(Day)"]}</Td>
                  <Td data-label="Price (Rs)">{result.Price}</Td>
                  <Td data-label="Action">{result.Action}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <hr />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const data = {
    Backtests: [
      {
        Slippage: "1%",
        Results: [
          {
            Rank: 1,
            Name: "Based on premium and",
            CalmarRatio: 0.84,
            OverallProfit: 132767.1,
            AvgDailyProfit: 108.38,
            "Win %(Day)": 0.6,
            Price: null,
            Action: "View",
          },
          {
            Rank: 2,
            Name: "strategy_name",
            CalmarRatio: 0.69,
            OverallProfit: 208500.31,
            AvgDailyProfit: 140.5,
            "Win %(Day)": 0.35,
            Price: null,
            Action: "View",
          },
          {
            Rank: 3,
            Name: "Wait and trade_Save",
            CalmarRatio: 0.67,
            OverallProfit: 70823.17,
            AvgDailyProfit: 64.33,
            "Win %(Day)": 0.6,
            Price: null,
            Action: "View",
          },
          {
            Rank: 4,
            Name: "iron condor",
            CalmarRatio: 0.64,
            OverallProfit: 88978.5,
            AvgDailyProfit: 69.35,
            "Win %(Day)": 0.62,
            Price: null,
            Action: "View",
          },
          {
            Rank: 5,
            Name: "strategy_name",
            CalmarRatio: 0.59,
            OverallProfit: 157335.75,
            AvgDailyProfit: 128.75,
            "Win %(Day)": 0.62,
            Price: null,
            Action: "View",
          },
          {
            Rank: 6,
            Name: "strategy_name",
            CalmarRatio: 0.59,
            OverallProfit: 157335.75,
            AvgDailyProfit: 128.75,
            "Win %(Day)": 0.62,
            Price: null,
            Action: "View",
          },
          {
            Rank: 7,
            Name: "Based on premium wit",
            CalmarRatio: 0.57,
            OverallProfit: 63852.65,
            AvgDailyProfit: 87.23,
            "Win %(Day)": 0.48,
            Price: null,
            Action: "View",
          },
          {
            Rank: 8,
            Name: "strategy_name",
            CalmarRatio: 0.53,
            OverallProfit: 194687.52,
            AvgDailyProfit: 131.19,
            "Win %(Day)": 0.35,
            Price: null,
            Action: "View",
          },
          {
            Rank: 9,
            Name: "strategy_name",
            CalmarRatio: 0.44,
            OverallProfit: 74582.97,
            AvgDailyProfit: 60.22,
            "Win %(Day)": 0.57,
            Price: 500,
            Action: "Buy",
          },
          {
            Rank: 10,
            Name: "Selling with re entr",
            CalmarRatio: 0.31,
            OverallProfit: 127095.7,
            AvgDailyProfit: 106.36,
            "Win %(Day)": 0.61,
            Price: null,
            Action: "View",
          },
        ],
      },
      {
        Slippage: "0.5%",
        Results: [
          {
            Rank: 1,
            Name: "Based on premium and",
            CalmarRatio: 2.02,
            OverallProfit: 194096.05,
            AvgDailyProfit: 158.45,
            "Win %(Day)": 0.62,
            Price: null,
            Action: "View",
          },
          {
            Rank: 2,
            Name: "strategy_name",
            CalmarRatio: 1.98,
            OverallProfit: 171862.74,
            AvgDailyProfit: 138.26,
            "Win %(Day)": 0.6,
            Price: 500,
            Action: "Buy",
          },
          {
            Rank: 3,
            Name: "strategy_name",
            CalmarRatio: 1.75,
            OverallProfit: 264090.37,
            AvgDailyProfit: 216.11,
            "Win %(Day)": 0.64,
            Price: null,
            Action: "View",
          },
          {
            Rank: 4,
            Name: "strategy_name",
            CalmarRatio: 1.75,
            OverallProfit: 264090.37,
            AvgDailyProfit: 216.11,
            "Win %(Day)": 0.64,
            Price: null,
            Action: "View",
          },
          {
            Rank: 5,
            Name: "Wait and trade_Save",
            CalmarRatio: 1.62,
            OverallProfit: 124537.84,
            AvgDailyProfit: 113.11,
            "Win %(Day)": 0.6,
            Price: null,
            Action: "View",
          },
          {
            Rank: 6,
            Name: "Based on premium wit",
            CalmarRatio: 1.55,
            OverallProfit: 99916.32,
            AvgDailyProfit: 136.5,
            "Win %(Day)": 0.48,
            Price: null,
            Action: "View",
          },
          {
            Rank: 7,
            Name: "Selling with re entr",
            CalmarRatio: 1.38,
            OverallProfit: 254470.35,
            AvgDailyProfit: 212.95,
            "Win %(Day)": 0.63,
            Price: null,
            Action: "View",
          },
          {
            Rank: 8,
            Name: "iron condor",
            CalmarRatio: 1.31,
            OverallProfit: 132699.25,
            AvgDailyProfit: 103.43,
            "Win %(Day)": 0.63,
            Price: null,
            Action: "View",
          },
          {
            Rank: 9,
            Name: "strategy_name",
            CalmarRatio: 1.12,
            OverallProfit: 136226.09,
            AvgDailyProfit: 111.11,
            "Win %(Day)": 0.58,
            Price: null,
            Action: "View",
          },
          {
            Rank: 10,
            Name: "strategy_name",
            CalmarRatio: 1.11,
            OverallProfit: 260759.53,
            AvgDailyProfit: 175.71,
            "Win %(Day)": 0.35,
            Price: null,
            Action: "View",
          },
        ],
      },
      {
        Slippage: "0%",
        Results: [
          {
            Rank: 1,
            Name: "Selling with re entr",
            CalmarRatio: 3.96,
            OverallProfit: 381845,
            AvgDailyProfit: 319.54,
            "Win %(Day)": 0.65,
            Price: null,
            Action: "View",
          },
          {
            Rank: 2,
            Name: "strategy_name",
            CalmarRatio: 3.62,
            OverallProfit: 268872.5,
            AvgDailyProfit: 216.31,
            "Win %(Day)": 0.64,
            Price: 500,
            Action: "Buy",
          },
          {
            Rank: 3,
            Name: "Based on premium and",
            CalmarRatio: 3.42,
            OverallProfit: 255425,
            AvgDailyProfit: 208.51,
            "Win %(Day)": 0.64,
            Price: null,
            Action: "View",
          },
          {
            Rank: 4,
            Name: "strategy_name",
            CalmarRatio: 3.22,
            OverallProfit: 370845,
            AvgDailyProfit: 303.47,
            "Win %(Day)": 0.65,
            Price: null,
            Action: "View",
          },
          {
            Rank: 5,
            Name: "strategy_name",
            CalmarRatio: 3.22,
            OverallProfit: 370845,
            AvgDailyProfit: 303.47,
            "Win %(Day)": 0.65,
            Price: null,
            Action: "View",
          },
          {
            Rank: 6,
            Name: "Based on premium wit",
            CalmarRatio: 3.01,
            OverallProfit: 135980,
            AvgDailyProfit: 185.77,
            "Win %(Day)": 0.49,
            Price: null,
            Action: "View",
          },
          {
            Rank: 7,
            Name: "strategy_name",
            CalmarRatio: 2.76,
            OverallProfit: 267867.5,
            AvgDailyProfit: 218.49,
            "Win %(Day)": 0.6,
            Price: null,
            Action: "View",
          },
          {
            Rank: 8,
            Name: "Wait and trade_Save",
            CalmarRatio: 2.62,
            OverallProfit: 178252.5,
            AvgDailyProfit: 161.9,
            "Win %(Day)": 0.63,
            Price: null,
            Action: "View",
          },
          {
            Rank: 9,
            Name: "iron condor",
            CalmarRatio: 2.44,
            OverallProfit: 176420,
            AvgDailyProfit: 137.51,
            "Win %(Day)": 0.65,
            Price: null,
            Action: "View",
          },
          {
            Rank: 10,
            Name: "strategy_name",
            CalmarRatio: 2.04,
            OverallProfit: 244555,
            AvgDailyProfit: 198.66,
            "Win %(Day)": 0.62,
            Price: null,
            Action: "View",
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <div>
          <button onClick={toggleTheme}>
            {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        <div>
          <BacktestResults results={data} />
        </div>
      </div>
    </>
  );
};

export default App;
