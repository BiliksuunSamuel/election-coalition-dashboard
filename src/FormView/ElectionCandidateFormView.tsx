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
  IElectionCandidateRequest,
  IElectionPortfolio,
} from "../models/ElectionModel";

interface IProps extends IModalProps {
  handleClose: () => void;
  handleCandidateRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateRequest: IElectionCandidateRequest;
  portfolios: IElectionPortfolio[];
  preview: any;
  setCandidateFile: React.Dispatch<React.SetStateAction<any>>;
}
export default function ElectionCandidateFormView({
  handleCandidateRequestForm,
  candidateRequest,
  portfolios,
  handleClose,
  setCandidateFile,
  preview,
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
            <CustomSelect label="Party" />

            <Stack flex={1}>
              <CustomSelect
                value={candidateRequest.portfolio}
                label="Portfolio"
              >
                {portfolios.map((pf) => (
                  <MenuItemView
                    onClick={() =>
                      handleCandidateRequestForm({
                        currentTarget: {
                          name: "portfolio",
                          id: "candidate_portfolio",
                        },
                        target: {
                          value: pf.title,
                        },
                      } as any)
                    }
                    value={pf.title}
                    key={pf.id}
                  >
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
