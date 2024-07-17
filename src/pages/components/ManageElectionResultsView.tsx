import { Divider, Stack } from "@mui/material";
import {
  CustomDialog,
  CustomOutlinedDisplay,
  PrimaryButton,
} from "../../components";
import { IModalProps } from "../../interfaces";
import {
  IElectionResult,
  IManageResultsRequest,
} from "../../models/ElectionResultModel";
import { ElectionPollingStatsChart, PollingSummaryChart } from "../../charts";
import { RowContainer } from "../../views";
import { GrayShades } from "../../theme/AppColors";
import { ElectionResultsStatus } from "../../enums/ElectionResultsStatus";

interface IProps extends IModalProps {
  electionResults: IElectionResult;
  handleClose: () => void;
  handleManageResults: (request: IManageResultsRequest) => void;
}
export default function ManageElectionResultsView({
  electionResults,
  handleClose,
  handleManageResults,
  ...others
}: IProps) {
  return (
    <CustomDialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      showCloseIcon={true}
      {...others}
    >
      <Stack spacing={2}>
        <Stack alignItems="flex-start" direction="row">
          <Stack padding={2} flex={1}>
            <PollingSummaryChart
              data={{
                rejectedVotes: electionResults.rejectedVotes || 0,
                validVotes: electionResults.validVotes || 0,
                totalVotes: electionResults.totalVotes || 0,
              }}
            />
          </Stack>
          <Stack
            padding={2}
            borderLeft={() => `1px solid ${GrayShades[300]}`}
            spacing={1.5}
            flex={1}
            height="100%"
          >
            <CustomOutlinedDisplay
              value={electionResults.constituency}
              label="Constituency"
            />
            <CustomOutlinedDisplay
              value={electionResults.pollingStation}
              label="Polling Station"
            />
            <CustomOutlinedDisplay
              value={electionResults.createdBy}
              label="Polling Agent"
            />
            {electionResults.status === ElectionResultsStatus.Pending && (
              <RowContainer justifyContent="flex-end">
                <PrimaryButton
                  onClick={() =>
                    handleManageResults({
                      status: ElectionResultsStatus.Rejected,
                    })
                  }
                  variant="outlined"
                >
                  Decline
                </PrimaryButton>
                <PrimaryButton
                  onClick={() =>
                    handleManageResults({
                      status: ElectionResultsStatus.Approved,
                    })
                  }
                  variant="contained"
                  style={{ width: "180px" }}
                >
                  Approve
                </PrimaryButton>
              </RowContainer>
            )}
          </Stack>
        </Stack>
        <Divider />
        <Stack>
          <ElectionPollingStatsChart
            labels={electionResults.candidatesResults.map(
              (c) => c.partyShortName
            )}
            data={electionResults.candidatesResults.map((c) => c.votes)}
          />
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
