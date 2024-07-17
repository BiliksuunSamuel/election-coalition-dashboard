import {
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FluidContainer, ResponseModal, RowContainer } from "../../views";
import {
  CustomLoader,
  DashboardSummaryLoader,
  PrimaryButton,
} from "../../components";
import PoliticalPartiesModal from "../components/PoliticalPartiesModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useParty from "../../hooks/useParty";
import { clearResponse } from "../../features/ResponseReducer";
import { useEffect } from "react";
import { PartyStatus } from "../../enums/PartyStatus";
import {
  CandidateResultsChartView,
  DasboardSummaryCardView,
  ElectionResultsSummaryStats,
  ManageElectionResultsView,
} from "../components";
import { LuBarChart3 } from "react-icons/lu";
import useElectionResult from "../../hooks/useElectionResult";
import { ElectionResultsStatus } from "../../enums/ElectionResultsStatus";
import { useNavigate } from "react-router-dom";

export default function ContentPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const {
    setShowPoliticalParties,
    showPoliticalParties,
    showCreateForm,
    setShowCreateForm,
    request,
    handleRequestForm,
    parties,
    handleGetAllParties,
    filter,
    handleFilterForm,
    handleCreateParty,
    handleUpdateParty,
    selectedParty,
    setRequest,
    setSelectedParty,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteParty,
  } = useParty();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const {
    handleGetAllElectionResults,
    results,
    manage,
    setSelectedResults,
    selectedResults,
    handleManageResults,
    setManage,
  } = useElectionResult();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  async function loadData() {
    await Promise.all([handleGetAllParties()]);
    await handleGetAllElectionResults({
      ...filter,
      pageSize: 5,
      status: ElectionResultsStatus.Pending,
    });
  }

  useEffect(() => {
    if (selectedParty) {
      setRequest({
        name: selectedParty.name,
        shortName: selectedParty.shortName,
        status: selectedParty.status,
      });
    } else {
      setRequest({ name: "", shortName: "", status: PartyStatus.Active });
    }
  }, [selectedParty]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <CustomLoader open={loading} />
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
      {selectedResults && (
        <ManageElectionResultsView
          handleManageResults={handleManageResults}
          open={manage}
          handleClose={() => setManage(false)}
          electionResults={selectedResults}
        />
      )}
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />

      {/* Political parties modal section */}
      <PoliticalPartiesModal
        open={showPoliticalParties}
        handleClose={() => setShowPoliticalParties(false)}
        loading={loading}
        showcreatePartyForm={showCreateForm}
        setshowcreatePartyForm={setShowCreateForm}
        request={request}
        handleRequestForm={handleRequestForm}
        handleSubmitForm={() =>
          selectedParty ? handleUpdateParty() : handleCreateParty()
        }
        parties={parties}
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDeleteParty}
        filter={filter}
        handleFilterForm={handleFilterForm}
        handleSearch={(filter) => handleGetAllParties(filter)}
      />
      <Stack spacing={2} padding={2}>
        <RowContainer
          justifyContent="flex-end"
          paddingX={(theme) => theme.spacing(2)}
        >
          <PrimaryButton>
            <RowContainer spacing={0}>
              <LuBarChart3 size={25} />
              <Typography>Statistics</Typography>
            </RowContainer>
          </PrimaryButton>
          <PrimaryButton onClick={() => setShowPoliticalParties(true)}>
            Political Parties
          </PrimaryButton>
        </RowContainer>
        <Divider />
        {loading && (
          <Stack padding={2}>
            <DashboardSummaryLoader />
          </Stack>
        )}
        {!loading && (
          <Stack padding={2}>
            <DasboardSummaryCardView
              data={{
                totalOutstandingPayments: 0,
                totalSales: 0,
                totalProducts: 0,
                productsSoldCount: 0,
              }}
              categories={[]}
              loading={loading}
              loadingProductSoldCount={loading}
              loadingProductsCount={loading}
              loadingOutstandingSales={loading}
              loadingTotalSales={loading}
            />
          </Stack>
        )}
        <Grid
          container
          rowSpacing={2}
          columnSpacing={isMobile ? 0 : 2}
          paddingRight={(theme) => theme.spacing(4)}
        >
          <Grid item sm={12} md={12} lg={6} xl={7} xs={12}>
            <CandidateResultsChartView loading={loading} />
          </Grid>
          <Grid item sm={12} md={12} lg={6} xl={5} xs={12}>
            <ElectionResultsSummaryStats loading={loading} />
          </Grid>
        </Grid>
        <Stack padding={2}>
          <RowContainer justifyContent="space-between">
            <Typography fontWeight="bold">Election Results</Typography>
            <PrimaryButton
              onClick={() => navigation("/dashboard/results")}
              variant="outlined"
            >
              View All
            </PrimaryButton>
          </RowContainer>
          <TableContainer>
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
      </Stack>
    </FluidContainer>
  );
}
