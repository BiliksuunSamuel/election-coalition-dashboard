import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CustomLoader,
  Flex,
  PrimaryButton,
  SearchInput,
} from "../../components";
import { useElection } from "../../hooks/useElection";
import {
  ActionConfirmationModal,
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
import { Stack } from "@mui/material";
import { ElectionTableView } from "../../sections";
import useParty from "../../hooks/useParty";
import useCandidate from "../../hooks/useCandidate";
import { ElectionDetailsFormView } from "../../FormView";

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
    getElection,
    electionId,
    setElectionId,
    loadingElectionDetails,
    setShowElectionDetailsModal,
    portfolioRequest,
    handleCreateElectionPortfolio,
    handlePortfolioRequestForm,
    showDeletElectionModal,
    setShowDeleteElectionModal,
    setSelectedElection,
    selectedElection,
    handleDeleteElection,
    setCreateRequest,
    tab,
    setTab,
    showElectionForm,
    setShowElectionForm,
    updateElection,
  } = useElection();

  const {
    candidates,
    filterCandidates,
    filter: candidateFilter,
    setFilter: setCandidateFilter,
    updateCandidateStatus,
  } = useCandidate();

  const { partiesForLookup, handleGetPartiesForLookup } = useParty();

  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );

  async function loadData() {
    await Promise.all([
      getCategoriesForDisplay(),
      getElections(),
      handleGetPartiesForLookup(),
      getElectionCandidates(),
    ]);
  }

  async function getElectionCandidates() {
    if (tab && tab === "Candidates" && selectedElection) {
      await filterCandidates({
        ...candidateFilter,
        electionId: selectedElection?.id,
        pageSize: 5,
      });
    }
  }

  useEffect(() => {
    getElectionCandidates();
  }, [tab]);

  useEffect(() => {
    if (selectedElection) {
      setCreateRequest({
        title: selectedElection.title,
        category: selectedElection.category,
        startDate: selectedElection.startDate,
        endDate: selectedElection.endDate,
        description: selectedElection.description,
      });
    } else {
      setCreateRequest({
        title: "",
        category: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }, [selectedElection]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FluidContainer>
      <CustomLoader open={loading} />

      <ElectionDetailsFormView
        handleElectionDetailsForm={handleElectionForm}
        open={showElectionForm}
        request={createRequest}
        loading={loading}
        categories={categoriesForDisplay}
        handleClose={() => setShowElectionForm(false)}
        handleSubmit={() =>
          selectedElection ? updateElection() : createElection()
        }
      />

      <ElectionDetailsModal
        handleClose={() => {
          setShowElectionDetailsModal(false);
          setTab("Election Details");
          setSelectedElection(null);
        }}
        open={showElectionDetailsModal}
        election={selectedElection}
        getElection={getElection}
        loading={loadingElectionDetails}
        electionId={electionId}
        portfolioRequest={portfolioRequest}
        handleCreatePortfolio={handleCreateElectionPortfolio}
        handlePortfolioRequestForm={handlePortfolioRequestForm}
        partiesForLookup={partiesForLookup}
        tab={tab}
        setTab={setTab}
        candidates={candidates}
        handleCandidateSearch={async (query) => {
          setCandidateFilter({ ...candidateFilter, filter: query });
          await filterCandidates({ ...candidateFilter, filter: query });
        }}
        handleCandidateSelectedPage={async (page) => {
          setCandidateFilter({ ...candidateFilter, page });
          await filterCandidates({ ...candidateFilter, page });
        }}
        setShowElectionForm={setShowElectionForm}
        updateCandidateStatus={updateCandidateStatus}
      />
      <ActionConfirmationModal
        open={showDeletElectionModal}
        title="Delete Election"
        message="Are you sure you want to delete this election?"
        handleClose={() => {
          setShowDeleteElectionModal(false);
          setSelectedElection(null);
        }}
        handelConfirm={handleDeleteElection}
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
      <ContentContainer height="100%" spacing={3} bgcolor="transparent">
        <RowContainer
          spacing={2}
          padding={0}
          width="100%"
          justifyContent="flex-end"
        >
          <SearchInput placeholder="Search Elections....." />
          <Flex />
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
        <Stack borderRadius={1} width="100%" spacing={2}>
          <ElectionTableView
            handleViewElection={(e) => {
              setElectionId(e.id);
              setSelectedElection(e);
              setShowElectionDetailsModal(true);
            }}
            loading={loading}
            elections={elections.results}
            handleDeleteElection={(election) => {
              setSelectedElection(election);
              setShowDeleteElectionModal(true);
            }}
          />

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
