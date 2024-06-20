import { Divider, Stack } from "@mui/material";
import {
  CustomPaginationView,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import { CustomLoader, PrimaryButton } from "../../components";
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
      <Stack spacing={2}>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton onClick={() => setShowConstituencyForm(true)}>
            Create Constituency
          </PrimaryButton>
        </RowContainer>
        <Divider />
        <Stack spacing={2}>
          <ConstituencyTableView
            handleSelectConstituency={(data) => {
              setShowConstituencyForm(true);
              setSelectedConstituency(data);
            }}
            constituencies={constituencies.results}
          />
          <CustomPaginationView
            page={constituencies.page}
            totalCount={constituencies.totalCount}
            totalPages={constituencies.totalPages}
            pageSize={constituencies.pageSize}
            handlePage={(_, p) => getConstituencies({ page: p })}
          />
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
