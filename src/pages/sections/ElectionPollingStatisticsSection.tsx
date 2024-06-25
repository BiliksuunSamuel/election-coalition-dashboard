import { Stack, Typography } from "@mui/material";
import { ElectionPollingStatsChart, PollingSummaryChart } from "../../charts";

export default function ElectionPollingStatisticsSection() {
  return (
    <Stack spacing={1}>
      <Stack></Stack>
      <Stack
        minHeight="300px"
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Stack flex={1} spacing={2}>
          <Typography textAlign="left" fontWeight="bold">
            Candidates Results
          </Typography>
          <ElectionPollingStatsChart />
        </Stack>
        <Stack flex={0.75} spacing={2}>
          <Typography textAlign="right" fontWeight="bold">
            Results Summary
          </Typography>
          <PollingSummaryChart />
        </Stack>
      </Stack>
    </Stack>
  );
}
