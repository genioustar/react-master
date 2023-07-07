import { useState } from "react";
import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import styled, { useTheme } from "styled-components";
import { fetchCoinHistory } from "../api";
interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Toggle = styled.button`
  background-color: "red";
  color: "white";
  padding: 10px;
  border: none;
  cursor: pointer;
`;
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const convertedData = data?.map((item) => {
    return {
      ...item,
      time_open: new Date(item.time_open),
      time_close: new Date(item.time_close),
    };
  });
  // console.log(convertedData?.map((price) => price.close));
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(true);
  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : isChecked ? (
        <>
          <Toggle onClick={handleToggle}>Candle Chart</Toggle>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: convertedData?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
                colors: [theme.accentColor],
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      ) : (
        <>
          <Toggle onClick={handleToggle}>Line Chart</Toggle>
          <ApexChart
            type="candlestick"
            series={[
              {
                data: convertedData?.map((item) => {
                  return {
                    x: item.time_open,
                    y: [item.open, item.high, item.low, item.close],
                  };
                }) as { x: Date; y: number[] }[],
              },
            ]}
            options={{
              chart: { height: 300, width: 500 },
              title: { text: "candlestick Chart" },

              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              xaxis: { type: "datetime" },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
