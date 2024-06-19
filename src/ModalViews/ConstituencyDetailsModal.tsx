import { Divider, Stack, Tabs } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomTab,
  Title,
} from "../components";
import { IModalProps } from "../interfaces";
import { RowContainer } from "../views";
import { ConstituencyFormView, PollingStationFormView } from "../FormView";
import { ConstituencyPollingStationsView } from "../sections";
import useConstituency from "../hooks/useConstituency";
import {
  IConstituencyRequest,
  IPollingStation,
  IPollingStationRequest,
} from "../models/ConstituencyModal";

interface IProps extends IModalProps {
  handleClose?: () => void;
  constituencyRequest: IConstituencyRequest;
  handleConstituencyFormChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit?: () => void;
  loading: boolean;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  pollingStationRequest: IPollingStationRequest;
  handlePollingStationFormChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmitPollingStationForm: () => void;
  pollingStations: IPollingStation[];
}
export default function ConstituencyDetailsModal({
  handleClose,
  constituencyRequest,
  handleConstituencyFormChange,
  handleSubmit,
  loading,
  tab,
  pollingStationRequest,
  handlePollingStationFormChange,
  handleSubmitPollingStationForm,
  setTab,
  pollingStations,
  ...others
}: IProps) {
  const { showPollingStationForm, setShowPollingStationForm } =
    useConstituency();

  return (
    <CustomDialog maxWidth="md" fullWidth showCloseIcon={false} {...others}>
      <Stack>
        <PollingStationFormView
          handleClose={() => setShowPollingStationForm(false)}
          open={showPollingStationForm}
          request={pollingStationRequest}
          handleFormChange={handlePollingStationFormChange}
          handleSubmit={handleSubmitPollingStationForm}
          loading={loading}
        />
        <RowContainer paddingY={1} paddingX={2} justifyContent="space-between">
          <Title variant="body1">Constituency Details</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Divider />
        <Stack>
          <Tabs value={tab} scrollButtons="auto">
            {["Constituency Details", "Polling Stations"].map((tb) => (
              <CustomTab
                value={tb}
                onClick={() => setTab(tb)}
                label={tb}
                key={tb}
                disabled={loading}
              />
            ))}
          </Tabs>
        </Stack>
        <Divider />

        <Stack marginTop={4}>
          {tab === "Constituency Details" && (
            <ConstituencyFormView
              handleFormChange={handleConstituencyFormChange}
              handleSubmit={handleSubmit}
              request={constituencyRequest}
              loading={loading}
            />
          )}
          {tab === "Polling Stations" && (
            <ConstituencyPollingStationsView
              loading={loading}
              pollingStations={pollingStations}
              handleCreatePollingStation={() => setShowPollingStationForm(true)}
            />
          )}
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
