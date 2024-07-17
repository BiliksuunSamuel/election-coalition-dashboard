import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useElectionResult from "../../hooks/useElectionResult";
import { FluidContainer, ResponseModal } from "../../views";
import { CustomLoader, PrimaryButton } from "../../components";
import { useEffect } from "react";
import { clearResponse } from "../../features/ResponseReducer";
import { ManageElectionResultsView } from "../components";

export default function ResultsPage() {
  const dispatch = useAppDispatch();
  const {
    handleGetAllElectionResults,
    results,
    manage,
    setSelectedResults,
    selectedResults,
    handleManageResults,
    setManage,
    filter,
  } = useElectionResult();
  const { error, message, loading } = useAppSelector(
    (state) => state.ResponseReducer
  );
  async function loadData() {
    await Promise.all([
      handleGetAllElectionResults({ ...filter, status: null } as any),
    ]);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <CustomLoader open={loading} />
      {selectedResults && (
        <ManageElectionResultsView
          handleManageResults={handleManageResults}
          open={manage}
          handleClose={() => setManage(false)}
          electionResults={selectedResults}
        />
      )}
      <ResponseModal
        variant="success"
        open={Boolean(message)}
        message={message}
        title="Success"
        handleDone={() => {
          dispatch(clearResponse());
          loadData();
        }}
      />
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />
      <Stack padding={2}>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Polling Station</TableCell>
                <TableCell>Polling Code</TableCell>
                <TableCell>Polling Agent</TableCell>
                <TableCell>Total Votes</TableCell>
                <TableCell>Valid Votes</TableCell>
                <TableCell>Rejected Votes</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.pollingStation}</TableCell>
                  <TableCell>{result.pollingStationCode}</TableCell>
                  <TableCell>{result.createdBy}</TableCell>
                  <TableCell>{result.totalVotes}</TableCell>
                  <TableCell>{result.validVotes}</TableCell>
                  <TableCell>{result.rejectedVotes}</TableCell>
                  <TableCell>{result.status}</TableCell>
                  <TableCell>
                    <PrimaryButton
                      onClick={() => {
                        setSelectedResults(result);
                        setManage(true);
                      }}
                    >
                      View
                    </PrimaryButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </FluidContainer>
  );
}
