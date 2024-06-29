import {
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  CustomDialog,
  CustomInput,
  CustomSelect,
  MenuItemView,
  PrimaryButton,
} from "../components";
import { IModalProps } from "../interfaces";
import { RowContainer } from "../views";
import { ChangeEvent } from "react";
import { GalleryAdd } from "iconsax-react";
import {
  IElectionCandidate,
  IElectionPortfolio,
} from "../models/ElectionModel";
import { IPartyLookup } from "../models/PartyModel";
import { ICandidateRequest } from "../models/CandidateModel";

interface IProps extends IModalProps {
  handleClose: () => void;
  handleCandidateRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateRequest: ICandidateRequest;
  portfolios: IElectionPortfolio[];
  preview: any;
  setCandidateFile: React.Dispatch<React.SetStateAction<any>>;
  selectedCandidate: IElectionCandidate | null;
  partiesForLookup: IPartyLookup[];
}
export default function ElectionCandidateFormView({
  handleCandidateRequestForm,
  candidateRequest,
  portfolios,
  handleClose,
  setCandidateFile,
  preview,
  partiesForLookup,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <CustomDialog maxWidth="sm" fullWidth showCloseIcon={false} {...others}>
      <Stack spacing={1}>
        <RowContainer justifyContent="flex-start">
          <Typography variant="h5">Candidate Details</Typography>
        </RowContainer>
        <Divider />
        <Stack spacing={2}>
          <Stack flex={1} spacing={1.5}>
            <CustomInput
              value={candidateRequest.name}
              name="name"
              placeholder="Full Name "
              label="Name"
              onChange={handleCandidateRequestForm}
            />
            <CustomSelect
              label="Party"
              onChange={(e) =>
                handleCandidateRequestForm({
                  currentTarget: {
                    name: "portfolio",
                    id: "candidate_portfolio",
                  },
                  target: e.target as any,
                } as any)
              }
            >
              {partiesForLookup.map((party) => (
                <MenuItemView value={party.name} key={party.id}>
                  {party.name}
                </MenuItemView>
              ))}
            </CustomSelect>

            <Stack flex={1}>
              <CustomSelect
                value={candidateRequest.portfolio}
                label="Portfolio"
                onChange={(e) =>
                  handleCandidateRequestForm({
                    currentTarget: {
                      name: "portfolio",
                      id: "candidate_portfolio",
                    },
                    target: e.target as any,
                  } as any)
                }
              >
                {portfolios.map((pf) => (
                  <MenuItemView value={pf.title} key={pf.id}>
                    {pf.title}
                  </MenuItemView>
                ))}
              </CustomSelect>
            </Stack>
          </Stack>
          <RowContainer
            spacing={3}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Stack>
              <Stack
                width="117px"
                height="117px"
                borderRadius="5px"
                border={(theme) =>
                  `1px solid ${alpha(theme.palette.common.black, 0.045)}`
                }
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                position="relative"
              >
                <img src={preview} className="img" />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="candidate-pic"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setCandidateFile(e.target.files[0]);
                    }
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    zIndex: 100,
                    bgcolor: alpha(theme.palette.common.black, 0.05),
                    borderRadius: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography component="label" htmlFor="candidate-pic">
                    <GalleryAdd size="16" color={theme.palette.primary.main} />
                  </Typography>
                </IconButton>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <PrimaryButton
                style={{ height: "45px", minWidth: "200px" }}
                fullWidth
              >
                Save Changes
              </PrimaryButton>
              <PrimaryButton onClick={handleClose} variant="outlined">
                Cancel
              </PrimaryButton>
            </Stack>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
