import { Skeleton, Stack, StackProps } from "@mui/material";
import { RowContainer } from "../../views";
import { Title } from "../../components";
import { ElectionPollingStatsChart } from "../../charts";

interface IProps extends StackProps {
  loading: boolean;
}
export default function CandidateResultsChartView({
  loading,
  ...others
}: IProps) {
  return (
    <Stack
      padding={2}
      borderRadius={2}
      minHeight="300px"
      height="100%"
      maxHeight="350px"
      {...others}
      className="stats-card"
    >
      <RowContainer justifyContent="space-between" width="100%">
        <Title>Candidate Votes</Title>
      </RowContainer>
      <Stack marginTop={3}>
        {loading && <Skeleton variant="rounded" height={300} />}
        {!loading && <ElectionPollingStatsChart />}
      </Stack>
    </Stack>
  );
}
