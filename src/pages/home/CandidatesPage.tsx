import { useEffect } from "react";
import { CandidateFormView } from "../../FormView";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CustomLoader,
  Flex,
  PrimaryButton,
  SearchInput,
} from "../../components";
import { clearResponse } from "../../features/ResponseReducer";
import useCandidate from "../../hooks/useCandidate";
import { CandidateTableView } from "../../sections";
import {
  ActionConfirmationModal,
  ContentContainer,
  CustomPaginationView,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import useParty from "../../hooks/useParty";
import { useElection } from "../../hooks/useElection";
import { initialCandidateRequest } from "../../models/CandidateModel";
import { Stack } from "@mui/material";
import useConstituency from "../../hooks/useConstituency";

export default function CandidatesPage() {
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const {
    filterCandidates,
    filter,
    setFilter,
    candidates,
    handleCreateCandidate,
    handleCandidateFormChange,
    showCandidateForm,
    setShowCandidateForm,
    candidateRequest,
    setCandidateRequest,
    setSelectedCandidate,
    selectedCandidate,
    showDeleteModal,
    handleUpdateCandidate,
    handleDeleteCandidate,
    setShowDeleteModal,
  } = useCandidate();

  const { getConstituencies, constituencies } = useConstituency();

  const { partiesForLookup, handleGetPartiesForLookup } = useParty();
  const { elections, getElections, selectedElection, setSelectedElection } =
    useElection();
  async function loadData() {
    await Promise.all([
      filterCandidates(filter),
      handleGetPartiesForLookup(),
      getElections({ pageSize: 100 }),
      getConstituencies({ pageSize: 500 }),
    ]);
  }
  useEffect(() => {
    if (selectedCandidate) {
      setCandidateRequest({
        name: selectedCandidate.name,
        partyName: selectedCandidate.partyName,
        partyId: selectedCandidate.partyId,
        partyShortName: selectedCandidate.partyShortName,
        status: selectedCandidate.status,
        image: selectedCandidate.image,
        portfolioId: selectedCandidate.portfolioId,
        portfolio: selectedCandidate.portfolio,
        electionId: selectedCandidate.electionId,
        electionTitle: selectedCandidate.electionTitle,
        constituencyId: selectedCandidate.constituencyId,
        constituencyName: selectedCandidate.constituencyName,
        dorminance: selectedCandidate.dorminance,
      });
      setSelectedElection(
        elections.results.find(
          (e) => e.id === selectedCandidate.electionId || ""
        ) ?? null
      );
    } else {
      setCandidateRequest(initialCandidateRequest);
    }
  }, [selectedCandidate]);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <FluidContainer>
      <ActionConfirmationModal
        open={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setSelectedCandidate(null);
        }}
        handelConfirm={handleDeleteCandidate}
        title="Delete Candidate"
        message="Are you sure you want to delete this candidate? This action cannot be undone."
      />
      <CustomLoader open={loading} />
      <CandidateFormView
        candidateRequest={candidateRequest}
        open={showCandidateForm}
        constituencies={constituencies.results}
        handleClose={() => {
          setShowCandidateForm(false);
          setSelectedCandidate(null);
          setCandidateRequest(initialCandidateRequest);
        }}
        handleCandidateFormChange={handleCandidateFormChange}
        loading={loading}
        handleSubmit={() =>
          selectedCandidate ? handleUpdateCandidate() : handleCreateCandidate()
        }
        parties={partiesForLookup}
        elections={elections.results}
        selectedElection={selectedElection}
        setSelectedElection={setSelectedElection}
        setCandidateRequest={setCandidateRequest}
      />
      <ResponseModal
        variant="success"
        open={Boolean(message)}
        message={message}
        title="Success"
        handleDone={async () => {
          dispatch(clearResponse());
          await loadData();
        }}
      />
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />
      <ContentContainer spacing={2}>
        <Stack spacing={2} width="100%">
          <RowContainer width="100%">
            <SearchInput
              value={filter.filter}
              onChange={(e) =>
                setFilter({ ...filter, filter: e.currentTarget.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  filterCandidates({ ...filter });
                }
              }}
              placeholder="Search Candidates"
            />
            <Flex />
            <PrimaryButton
              disabled={loading}
              onClick={() => setShowCandidateForm(true)}
            >
              Add Candidate
            </PrimaryButton>
          </RowContainer>

          <CandidateTableView
            handleDelete={(data) => {
              setSelectedCandidate(data);
              setShowDeleteModal(true);
            }}
            handleEdit={(data) => {
              setSelectedCandidate(data);
              setShowCandidateForm(true);
            }}
            candidates={candidates.results}
            loading={loading}
          />
          <CustomPaginationView
            page={candidates.page}
            pageSize={candidates.pageSize}
            totalPages={candidates.totalPages}
            totalCount={candidates.totalCount}
            handlePage={(page) => filterCandidates({ ...filter, page })}
          />
        </Stack>
      </ContentContainer>
    </FluidContainer>
  );
}
