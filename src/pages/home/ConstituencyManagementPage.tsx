import { Stack } from "@mui/material";
import {
  ActionConfirmationModal,
  ContentContainer,
  CustomPaginationView,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import {
  CustomLoader,
  Flex,
  PrimaryButton,
  SearchInput,
} from "../../components";
import { ConstituencyTableView } from "../../sections";
import { ConstituencyDetailsModal } from "../../ModalViews";
import useConstituency from "../../hooks/useConstituency";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearResponse } from "../../features/ResponseReducer";
import { useEffect } from "react";
import { PollingStationStatus } from "../../enums/PollingStationStatus";

export default function ConstituencyManagementPage() {
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const {
    showConstituencyForm,
    setShowConstituencyForm,
    constituencyRequest,
    handleConstituencyFormChange,
    handleCreateConstituency,
    constituencies,
    setSelectedConstituency,
    getConstituencies,
    selectedConstituency,
    setConstituencyRequest,
    tab,
    setTab,
    getPollingStations,
    handleCreatePollingStation,
    handlePollingStationFormChange,
    pollingStationRequest,
    pollingStations,
    handleUpdatePollingStation,
    handleDeletePollingStation,
    selectedPollingStation,
    setSelectedPollingStation,
    setPollingStationRequest,
    showPollingStationForm,
    setShowPollingStationForm,
    confirmDeletePollingStation,
    setConfirmDeletePollingStation,
    handleDeleteConstituency,
    confirmDeleteConstituency,
    setConfirmDeleteConstituency,
  } = useConstituency();

  async function handleLoadData() {
    await Promise.all([getConstituencies()]);
  }

  useEffect(() => {
    if (tab === "Polling Stations") {
      getPollingStations({
        page: 1,
        pageSize: 5,
        constituencyId: selectedConstituency?.id!,
      });
    }
  }, [tab]);

  useEffect(() => {
    if (selectedConstituency) {
      const { name, description, region } = selectedConstituency;
      setConstituencyRequest({
        name,
        description,
        region,
      });
    } else {
      setConstituencyRequest({
        name: "",
        description: "",
        region: "",
      });
    }
  }, [selectedConstituency]);

  useEffect(() => {
    setPollingStationRequest({
      name: selectedPollingStation?.name ?? "",
      code: selectedPollingStation?.code ?? "",
      address: selectedPollingStation?.address ?? "",
      constituencyId: selectedPollingStation?.constituencyId ?? "",
      status: selectedPollingStation?.status ?? PollingStationStatus.Closed,
    });
  }, [selectedPollingStation]);
  useEffect(() => {
    handleLoadData();
  }, []);
  return (
    <FluidContainer>
      <CustomLoader open={loading} />
      <ResponseModal
        open={Boolean(error)}
        variant="error"
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />
      <ResponseModal
        open={Boolean(message)}
        variant="success"
        message={message}
        title="Success"
        handleDone={() => dispatch(clearResponse())}
      />
      <ActionConfirmationModal
        open={confirmDeleteConstituency}
        handleClose={() => {
          setSelectedConstituency(null);
          setConfirmDeleteConstituency(false);
        }}
        title="Delete Constituency"
        message="Are you sure you want to delete this constituency? this action cannot be undone"
        handelConfirm={() => handleDeleteConstituency()}
      />
      <ConstituencyDetailsModal
        constituencyRequest={constituencyRequest}
        handleSubmit={handleCreateConstituency}
        handleConstituencyFormChange={handleConstituencyFormChange}
        tab={tab}
        pollingStations={pollingStations}
        pollingStationRequest={pollingStationRequest}
        handlePollingStationFormChange={handlePollingStationFormChange}
        handleSubmitPollingStationForm={handleCreatePollingStation}
        setTab={setTab}
        open={showConstituencyForm}
        handleClose={() => {
          setShowConstituencyForm(false);
          setSelectedConstituency(null);
        }}
        loading={loading}
        handleUpdatePollingStation={handleUpdatePollingStation}
        handleDeletePollingStation={handleDeletePollingStation}
        selectedPollingStation={selectedPollingStation}
        setSelectedPollingStation={setSelectedPollingStation}
        showPollingStationForm={showPollingStationForm}
        setShowPollingStationForm={setShowPollingStationForm}
        handlePollingStationPage={(page) =>
          getPollingStations({
            page,
            pageSize: 5,
            constituencyId: selectedConstituency?.id!,
          })
        }
        confirmDeletePollingStation={confirmDeletePollingStation}
        setConfirmDeletePollingStation={setConfirmDeletePollingStation}
        handleDeleteConstituency={handleDeleteConstituency}
        confirmDeleteConstituency={confirmDeleteConstituency}
        setConfirmDeleteConstituency={setConfirmDeleteConstituency}
      />
      <ContentContainer spacing={2}>
        <RowContainer justifyContent="flex-end">
          <SearchInput placeholder="Search Elections....." />
          <Flex />
          <PrimaryButton onClick={() => setShowConstituencyForm(true)}>
            Create Constituency
          </PrimaryButton>
        </RowContainer>
        <Stack width="100%" spacing={2}>
          <ConstituencyTableView
            handleSelectConstituency={(data) => {
              setShowConstituencyForm(true);
              setSelectedConstituency(data);
            }}
            loading={loading}
            constituencies={constituencies.results}
            handleDeleteConstituency={(data) => {
              setSelectedConstituency(data);
              setConfirmDeleteConstituency(true);
            }}
          />
          <CustomPaginationView
            page={constituencies.page}
            totalCount={constituencies.totalCount}
            totalPages={constituencies.totalPages}
            pageSize={constituencies.pageSize}
            handlePage={(_, p) => getConstituencies({ page: p })}
          />
        </Stack>
      </ContentContainer>
    </FluidContainer>
  );
}
