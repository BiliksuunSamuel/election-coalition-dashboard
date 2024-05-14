import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PrimaryButton } from "../../components";
import { useElection } from "../../hooks/useElection";
import {
  ContentContainer,
  CustomPaginationView,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import {
  CreateElectionCategoryModal,
  CreateElectionModal,
  ElectionDetailsModal,
} from "../components";
import { clearResponse } from "../../features/ResponseReducer";
import {
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";

export default function ElectionManagementPage() {
  const dispatch = useAppDispatch();
  const {
    showCreateElectionModal,
    setShowCreateElectionModal,
    handleElectionForm,
    createElection,
    createRequest,
    categoriesForDisplay,
    getCategoriesForDisplay,
    getElections,
    elections,
    createCategory,
    setShowAddCategoryModal,
    showAddCategoryModal,
    categoryRequest,
    handleCategoryRequestForm,
    showElectionDetailsModal,
    election,
    getElection,
    electionId,
    setElectionId,
    loadingElectionDetails,
    setShowElectionDetailsModal,
    portfolioRequest,
    handleCreateElectionPortfolio,
    handlePortfolioRequestForm,
    candidateFile,
    setCandidateFile,
    candidateRequest,
    handleCandidateRequestForm,
    handleCreateCandidate,
  } = useElection();

  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );

  async function loadData() {
    await Promise.all([getCategoriesForDisplay(), getElections()]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FluidContainer>
      <ElectionDetailsModal
        handleClose={() => setShowElectionDetailsModal(false)}
        open={showElectionDetailsModal}
        election={election}
        getElection={getElection}
        loading={loadingElectionDetails}
        electionId={electionId}
        portfolioRequest={portfolioRequest}
        handleCreatePortfolio={handleCreateElectionPortfolio}
        handlePortfolioRequestForm={handlePortfolioRequestForm}
        candidateFile={candidateFile}
        setCandidateFile={setCandidateFile}
        candidateRequest={candidateRequest}
        handleCandidateRequestForm={handleCandidateRequestForm}
        handleCreateCandidate={handleCreateCandidate}
      />
      <CreateElectionCategoryModal
        open={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
        request={categoryRequest}
        handleSubmit={createCategory}
        handleForm={handleCategoryRequestForm}
        loading={loading}
      />
      <CreateElectionModal
        handleClose={() => setShowCreateElectionModal(false)}
        children={<> </>}
        open={showCreateElectionModal}
        categories={categoriesForDisplay}
        handleForm={handleElectionForm}
        request={createRequest}
        handleSubmit={createElection}
        loading={loading}
      />

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
      <ContentContainer
        height="100%"
        spacing={3}
        padding={4}
        bgcolor="transparent"
      >
        <RowContainer
          spacing={2}
          padding={0}
          width="100%"
          justifyContent="flex-end"
        >
          <PrimaryButton
            onClick={() => setShowAddCategoryModal(true)}
            variant="outlined"
          >
            Add Category
          </PrimaryButton>
          <PrimaryButton onClick={() => setShowCreateElectionModal(true)}>
            Add New Election
          </PrimaryButton>
        </RowContainer>
        <Stack
          component={Paper}
          padding={2}
          borderRadius={1}
          elevation={1}
          spacing={2}
          width="100%"
        >
          <TableContainer component={Stack}>
            {loading && (
              <Stack marginTop={1} width="100%">
                <LinearProgress variant="indeterminate" />
              </Stack>
            )}
            <Table width="100%" size="medium">
              <TableHead>
                <TableRow
                  sx={(theme) => ({
                    bgcolor: alpha(theme.palette.primary.main, 0.085),
                  })}
                >
                  <TableCell size="small" align="left">
                    Title
                  </TableCell>
                  <TableCell size="small" align="left">
                    Category
                  </TableCell>
                  <TableCell size="small" align="left">
                    Start Date
                  </TableCell>
                  <TableCell size="small" align="left">
                    End Date
                  </TableCell>
                  <TableCell size="small" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elections.results.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell size="small" align="left">
                      {c.title}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {c.category}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {dayjs(c.startDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {dayjs(c.startDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell size="small" align="center">
                      <IconButton
                        onClick={() => {
                          setElectionId(c.id);
                          setShowElectionDetailsModal(true);
                        }}
                        size="small"
                      >
                        <IoIosMore />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <CustomPaginationView
            page={elections.page}
            totalCount={elections.totalCount}
            totalPages={elections.totalPages}
            pageSize={elections.pageSize}
            handlePage={(p) => getElections({ page: p })}
          />
        </Stack>
      </ContentContainer>
    </FluidContainer>
  );
}
