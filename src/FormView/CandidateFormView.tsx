import { Divider, MenuItem, Stack, Typography } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
} from "../components";
import { IModalProps } from "../interfaces";
import { ICandidateRequest } from "../models/CandidateModel";
import { RowContainer } from "../views";
import { IPartyLookup } from "../models/PartyModel";
import { IElection } from "../models/ElectionModel";

interface IProps extends IModalProps {
  handleClose?: () => void;
  candidateRequest: ICandidateRequest;
  handleCandidateFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  loading: boolean;
  parties: IPartyLookup[];
  selectedElection: IElection | null;
  setSelectedElection: React.Dispatch<React.SetStateAction<IElection | null>>;
  elections: IElection[];
  setCandidateRequest: React.Dispatch<React.SetStateAction<ICandidateRequest>>;
}
export default function CandidateFormView({
  handleClose,
  candidateRequest,
  handleCandidateFormChange,
  handleSubmit,
  loading,
  parties,
  elections,
  setSelectedElection,
  selectedElection,
  setCandidateRequest,
  ...others
}: IProps) {
  return (
    <CustomDialog fullWidth maxWidth="sm" showCloseIcon={false} {...others}>
      <Stack spacing={2}>
        <RowContainer justifyContent="space-between">
          <Typography fontWeight="bold">Candidate Details</Typography>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Divider />

        <Stack spacing={2}>
          <CustomInput
            onChange={handleCandidateFormChange}
            placeholder="Full Name"
            label="Name"
            name="name"
            value={candidateRequest.name}
          />
          <CustomSelect
            value={candidateRequest.electionTitle}
            label="Election"
            name="partyName"
          >
            {elections.map((election) => (
              <MenuItem
                onClick={() => {
                  setSelectedElection(election);
                  setCandidateRequest({
                    ...candidateRequest,
                    electionId: election.id,
                    electionTitle: election.title,
                  });
                }}
                key={election.id}
                value={election.title}
              >
                {election.title}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomSelect value={candidateRequest.portfolio} label="Portfolio">
            {selectedElection &&
              selectedElection.portfolios.map((portfolio) => (
                <MenuItem
                  onClick={() =>
                    setCandidateRequest({
                      ...candidateRequest,
                      portfolioId: portfolio.id,
                      portfolio: portfolio.title,
                    })
                  }
                  value={portfolio.title}
                  key={portfolio.id}
                >
                  {portfolio.title}
                </MenuItem>
              ))}
          </CustomSelect>

          <CustomSelect
            value={candidateRequest.partyName}
            label="Party"
            name="partyName"
          >
            {parties.map((party) => (
              <MenuItem
                onClick={() => {
                  setCandidateRequest({
                    ...candidateRequest,
                    partyId: party.id,
                    partyName: party.name,
                    partyShortName: party.shortName,
                  });
                }}
                key={party.id}
                value={party.name}
              >
                {party.name}
              </MenuItem>
            ))}
          </CustomSelect>
          <RowContainer justifyContent="flex-end">
            <PrimaryButton
              disabled={loading}
              onClick={handleSubmit}
              loading={loading}
            >
              Save Changes
            </PrimaryButton>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
