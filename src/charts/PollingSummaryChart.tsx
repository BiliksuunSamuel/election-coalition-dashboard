import { useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export default function PollingSummaryChart() {
  const theme = useTheme();
  return (
    <PieChart
      colors={[
        theme.palette.info.dark,
        theme.palette.success.dark,
        theme.palette.error.light,
      ]}
      series={[
        {
          data: [
            { id: 0, value: 7000000, label: "Total" },
            { id: 1, value: 6000500, label: "Valid" },
            { id: 2, value: 999500, label: "Rejected" },
          ],
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 45,
          startAngle: 0,
        },
      ]}
      height={200}
    />
  );
}
