import { Divider, Stack, StackProps } from "@mui/material";
import { RowContainer } from "../../views";
import { PrimaryButton } from "../../components";
import { ChangeEvent } from "react";
import {
  IElection,
  IElectionCandidateRequest,
} from "../../models/ElectionModel";
import { ElectionCandidatesTableView } from "../../sections";

interface IProps extends StackProps {
  candidateFile: File | null;
  setCandidateFile: React.Dispatch<React.SetStateAction<File | null>>;
  election: IElection | null;
  handleCandidateRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateRequest: IElectionCandidateRequest;
  handleCreateCandidate: () => void;
  loading: boolean;
  showCandidateForm: boolean;
  setShowCandidateForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ElectionCandidatesSection({
  candidateFile,
  setCandidateFile,
  election,
  candidateRequest,
  handleCandidateRequestForm,
  handleCreateCandidate,
  loading,
  showCandidateForm,
  setShowCandidateForm,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} {...others}>
      <RowContainer justifyContent="flex-end">
        <PrimaryButton onClick={() => setShowCandidateForm(true)}>
          Add New
        </PrimaryButton>
      </RowContainer>
      <Divider />
      <Stack>
        <ElectionCandidatesTableView
          loading={loading}
          candidates={election?.candidates ?? []}
        />
      </Stack>
    </Stack>
  );
}
