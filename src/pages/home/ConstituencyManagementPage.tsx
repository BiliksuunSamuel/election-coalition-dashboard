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
  } = useConstituency();

  async function handleLoadData() {
    await Promise.all([getConstituencies()]);
  }

  useEffect(() => {
    if (tab === "Polling Stations") {
      getPollingStations(selectedConstituency?.id ?? "");
    }
  }, [tab]);

  useEffect(() => {
    if (selectedConstituency) {
      const { name, description, region } = selectedConstituency;
      setConstituencyRequest({ name, description, region });
    } else {
      setConstituencyRequest({ name: "", description: "", region: "" });
    }
  }, [selectedConstituency]);

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
          />
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
