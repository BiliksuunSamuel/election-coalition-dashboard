import { Skeleton, Stack, StackProps } from "@mui/material";
import { RowContainer } from "../../views";
import { Title } from "../../components";
import { PollingSummaryChart } from "../../charts";

interface IProps extends StackProps {
  loading: boolean;
}

export default function ElectionResultsSummaryStats({
  loading,
  ...others
}: IProps) {
  return (
    <Stack
      padding={2}
      borderRadius={2}
      minHeight="300px"
      maxHeight="350px"
      height="100%"
      className="stats-card"
      {...others}
    >
      <RowContainer justifyContent="space-between" width="100%">
        <Title>Results Summary</Title>
      </RowContainer>
      <Stack marginTop={2}>
        {loading && <Skeleton variant="rounded" height={300} />}
        {!loading && <PollingSummaryChart height={300} />}
      </Stack>
    </Stack>
  );
}
