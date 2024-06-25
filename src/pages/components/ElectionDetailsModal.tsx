import { CircularProgress, Divider, Stack, Tabs, alpha } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomTab,
  SizedBox,
  Title,
} from "../../components";
import { IModalProps } from "../../interfaces";
import { RowContainer } from "../../views";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IElection,
  IElectionCandidateRequest,
  IElectionPortfolioRequest,
} from "../../models/ElectionModel";
import {
  ElectionCandidatesSection,
  ElectionDetailsSection,
  ElectionPollingStatisticsSection,
  ElectionPortfoliosSection,
} from "../sections";
import { ElectionDetailsTabs } from "../../types";
import { ElectionCandidateFormView } from "../../FormView";

interface IProps extends IModalProps {
  handleClose?: () => void;
  election: IElection | null;
  getElection: () => void;
  loading: boolean;
  electionId: string | null;
  portfolioRequest: IElectionPortfolioRequest;
  handleCreatePortfolio: () => void;
  handlePortfolioRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateFile: File | null;
  setCandidateFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleCandidateRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateRequest: IElectionCandidateRequest;
  handleCreateCandidate: () => void;
  showCandidateForm: boolean;
  setShowCandidateForm: React.Dispatch<React.SetStateAction<boolean>>;
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
  candidateFile,
  setCandidateFile,
  candidateRequest,
  handleCreateCandidate,
  handleCandidateRequestForm,
  showCandidateForm,
  setShowCandidateForm,
  ...others
}: IProps) {
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    if (candidateFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(candidateFile);
      fileReader.addEventListener("load", (e) => {
        handleCandidateRequestForm({
          currentTarget: {
            name: "image",
            id: "election_candidate_image",
          },
          target: {
            value: e.target?.result as any,
          },
        } as any);
        setPreview(e.target?.result);
      });
    } else {
      setPreview(null);
    }
  }, [candidateFile]);

  useEffect(() => {
    if (candidateFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(candidateFile);
      fileReader.addEventListener("load", (e) => {
        setPreview(e.target?.result);
      });
    } else {
      setPreview(null);
    }
  }, []);
  const [tab, setTab] = useState<ElectionDetailsTabs>("Election Details");
  useEffect(() => {
    if (electionId) {
      getElection();
    }
    setTab("Election Details");

    return () => setTab("Election Details");
  }, []);

  useEffect(() => {
    if (electionId) {
      getElection();
    }
  }, [electionId]);
  return (
    <CustomDialog {...others} showCloseIcon={false} fullWidth maxWidth={"md"}>
      <ElectionCandidateFormView
        open={showCandidateForm}
        handleClose={() => setShowCandidateForm(false)}
        portfolios={election?.portfolios ?? []}
        candidateRequest={candidateRequest}
        handleCandidateRequestForm={handleCandidateRequestForm}
        preview={preview}
        setCandidateFile={setCandidateFile}
      />
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
            <ElectionDetailsSection election={election} />
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
              candidateFile={candidateFile}
              setCandidateFile={setCandidateFile}
              election={election}
              candidateRequest={candidateRequest}
              handleCandidateRequestForm={handleCandidateRequestForm}
              handleCreateCandidate={handleCreateCandidate}
              loading={loading}
              setShowCandidateForm={setShowCandidateForm}
              showCandidateForm={showCandidateForm}
            />
          )}

          {tab === "Statistics" && <ElectionPollingStatisticsSection />}

          <SizedBox marginBottom={(theme) => theme.spacing(5)} />
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
