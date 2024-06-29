import { CircularProgress, Divider, Stack, Tabs, alpha } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomTab,
  SizedBox,
  Title,
} from "../../components";
import { IModalProps, IPagedResults } from "../../interfaces";
import { RowContainer } from "../../views";
import { ChangeEvent } from "react";
import {
  IElection,
  IElectionPortfolioRequest,
} from "../../models/ElectionModel";
import {
  ElectionCandidatesSection,
  ElectionDetailsSection,
  ElectionPollingStatisticsSection,
  ElectionPortfoliosSection,
} from "../sections";
import { ElectionDetailsTabs } from "../../types";
import { IPartyLookup } from "../../models/PartyModel";
import { ICandidate } from "../../models/CandidateModel";
import { UserStatus } from "../../enums/UserStatus";

interface IProps extends IModalProps {
  handleClose?: () => void;
  election: IElection | null;
  getElection: () => void;
  loading: boolean;
  electionId: string | null;
  portfolioRequest: IElectionPortfolioRequest;
  handleCreatePortfolio: () => void;
  handlePortfolioRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  partiesForLookup: IPartyLookup[];
  tab: ElectionDetailsTabs;
  setTab: React.Dispatch<React.SetStateAction<ElectionDetailsTabs>>;
  candidates: IPagedResults<ICandidate>;
  handleCandidateSearch: (query: string) => void;
  handleCandidateSelectedPage: (page: number) => void;
  setShowElectionForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateCandidateStatus: (id: string, status: UserStatus) => void;
}

export default function ElectionDetailsModal({
  handleClose,
  loading,
  election,
  getElection,
  electionId,
  portfolioRequest,
  handlePortfolioRequestForm,
  handleCreatePortfolio,
  partiesForLookup,
  tab,
  setTab,
  candidates,
  handleCandidateSearch,
  handleCandidateSelectedPage,
  setShowElectionForm,
  updateCandidateStatus,
  ...others
}: IProps) {
  return (
    <CustomDialog {...others} showCloseIcon={false} fullWidth maxWidth={"md"}>
      <Stack>
        <RowContainer paddingY={1} paddingX={2} justifyContent="space-between">
          <Title variant="body1">Edit Election</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Divider />
        <SizedBox height={(theme) => theme.spacing(4)} />
        <Stack width="100%" position="relative">
          {loading && (
            <Stack
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                bgcolor: alpha(theme.palette.common.black, 0.35),
                position: "absolute",
                zIndex: 100,
              })}
            >
              <CircularProgress />
            </Stack>
          )}
          <Stack>
            <Tabs value={tab} scrollButtons="auto">
              {[
                "Election Details",
                "Portfolios",
                "Candidates",
                "Statistics",
              ].map((tb) => (
                <CustomTab
                  value={tb}
                  onClick={() => setTab(tb as ElectionDetailsTabs)}
                  label={tb}
                  key={tb}
                />
              ))}
            </Tabs>
          </Stack>
          <SizedBox height={(theme) => theme.spacing(3.5)} />
          {tab === "Election Details" && (
            <ElectionDetailsSection
              setShowElectionForm={setShowElectionForm}
              election={election}
            />
          )}
          {tab === "Portfolios" && (
            <ElectionPortfoliosSection
              request={portfolioRequest}
              handleForm={handlePortfolioRequestForm}
              handleSubmit={handleCreatePortfolio}
              election={election}
            />
          )}
          {tab === "Candidates" && (
            <ElectionCandidatesSection
              election={election}
              loading={loading}
              handleUpdateStatus={async (data) =>
                await updateCandidateStatus(data.id, data.status)
              }
              candidates={candidates}
              handleCandidateSearch={handleCandidateSearch}
              handleCandidateSelectedPage={handleCandidateSelectedPage}
            />
          )}

          {tab === "Statistics" && <ElectionPollingStatisticsSection />}

          <SizedBox marginBottom={(theme) => theme.spacing(5)} />
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
