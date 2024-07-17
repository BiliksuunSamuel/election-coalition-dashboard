import { StackProps } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface IProps extends StackProps {
  labels?: string[];
  data?: number[];
}
export default function ElectionPollingStatsChart({
  data = [],
  labels = [],
}: IProps) {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: labels,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: data,
        },
      ]}
      height={300}
      margin={{ left: 80 }}
      borderRadius={10}
    />
  );
}
