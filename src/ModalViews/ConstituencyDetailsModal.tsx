import { Divider, Stack, Tabs } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomTab,
  Title,
} from "../components";
import { IModalProps, IPagedResults } from "../interfaces";
import { ActionConfirmationModal, RowContainer } from "../views";
import { ConstituencyFormView, PollingStationFormView } from "../FormView";
import { ConstituencyPollingStationsView } from "../sections";
import {
  IConstituencyRequest,
  IPollingStation,
  IPollingStationRequest,
} from "../models/ConstituencyModel";

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
  pollingStations: IPagedResults<IPollingStation>;
  handleUpdatePollingStation: () => void;
  handleDeletePollingStation: () => void;
  selectedPollingStation: IPollingStation | null;
  setSelectedPollingStation: React.Dispatch<
    React.SetStateAction<IPollingStation | null>
  >;
  showPollingStationForm: boolean;
  setShowPollingStationForm: React.Dispatch<React.SetStateAction<boolean>>;
  handlePollingStationPage: (page: number) => void;
  confirmDeletePollingStation: boolean;
  setConfirmDeletePollingStation: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConstituency: () => void;
  confirmDeleteConstituency: boolean;
  setConfirmDeleteConstituency: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleUpdatePollingStation,
  handleDeletePollingStation,
  selectedPollingStation,
  setSelectedPollingStation,
  showPollingStationForm,
  setShowPollingStationForm,
  handlePollingStationPage,
  confirmDeletePollingStation,
  setConfirmDeletePollingStation,
  handleDeleteConstituency,
  confirmDeleteConstituency,
  setConfirmDeleteConstituency,
  ...others
}: IProps) {
  return (
    <CustomDialog maxWidth="md" fullWidth showCloseIcon={false} {...others}>
      <Stack>
        <PollingStationFormView
          handleClose={() => {
            setShowPollingStationForm(false);
            setSelectedPollingStation(null);
          }}
          open={showPollingStationForm}
          request={pollingStationRequest}
          handleFormChange={handlePollingStationFormChange}
          handleSubmit={() =>
            selectedPollingStation
              ? handleUpdatePollingStation()
              : handleSubmitPollingStationForm()
          }
          loading={loading}
        />
        <ActionConfirmationModal
          open={confirmDeleteConstituency}
          title="Delete Constituency"
          message="Do you want to delete this constituency? this action cannot be reverted."
          handleClose={() => {
            setConfirmDeleteConstituency(false);
          }}
          handelConfirm={handleDeleteConstituency}
        />
        <ActionConfirmationModal
          open={confirmDeletePollingStation}
          title="Delete Polling Station"
          message="Do you want to delete this polling station? this action cannot be reverted."
          handleClose={() => {
            setSelectedPollingStation(null);
            setConfirmDeletePollingStation(false);
          }}
          handelConfirm={handleDeletePollingStation}
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
              handleDelete={() => setConfirmDeleteConstituency(true)}
            />
          )}
          {tab === "Polling Stations" && (
            <ConstituencyPollingStationsView
              loading={loading}
              pollingStations={pollingStations}
              handleCreatePollingStation={() => setShowPollingStationForm(true)}
              handleEditPollingStation={(pollingStation) => {
                setSelectedPollingStation(pollingStation);
                setShowPollingStationForm(true);
              }}
              handlePage={(p) => handlePollingStationPage(p)}
              handleDeletePollingStation={(ps) => {
                setSelectedPollingStation(ps);
                setConfirmDeletePollingStation(true);
              }}
            />
          )}
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
