import { StackProps, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { IElectionResultsSummaryData } from "../models/ElectionResultModel";

interface IProps extends StackProps {
  height?: number;
  data?: IElectionResultsSummaryData;
}
export default function PollingSummaryChart({
  data = {
    rejectedVotes: 999500,
    validVotes: 6000500,
    totalVotes: 7000000,
  },
  height = 230,
}: IProps) {
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
            { id: 0, value: data.totalVotes, label: "Total" },
            { id: 1, value: data.validVotes, label: "Valid" },
            { id: 2, value: data.rejectedVotes, label: "Rejected" },
          ],
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 45,
          startAngle: 0,
        },
      ]}
      height={height}
    />
  );
}
