import { BarChart } from "@mui/x-charts/BarChart";

export default function ElectionPollingStatsChart() {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["NDC", "NPP", "PNDC", "CPP", "PNC", "UGCC"],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [5000000, 2000000, 200000, 100000, 500900, 990000],
        },
      ]}
      height={300}
      margin={{ left: 80 }}
      borderRadius={10}
    />
  );
}
