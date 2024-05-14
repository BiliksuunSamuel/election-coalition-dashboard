import {
  IconButton,
  Stack,
  StackProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { RowContainer } from "../../views";
import {
  CustomInput,
  CustomSelect,
  MenuItemView,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { GalleryAdd } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import resources from "../../resources";
import {
  IElection,
  IElectionCandidateRequest,
} from "../../models/ElectionModel";

interface IProps extends StackProps {
  candidateFile: File | null;
  setCandidateFile: React.Dispatch<React.SetStateAction<File | null>>;
  election: IElection | null;
  handleCandidateRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateRequest: IElectionCandidateRequest;
  handleCreateCandidate: () => void;
}
export default function ElectionCandidatesSection({
  candidateFile,
  setCandidateFile,
  election,
  candidateRequest,
  handleCandidateRequestForm,
  handleCreateCandidate,
}: IProps) {
  const theme = useTheme();
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
  return (
    <Stack spacing={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">No.</TableCell>
              <TableCell size="small">Name</TableCell>
              <TableCell size="small">Portfolio</TableCell>
              <TableCell size="small">Affialiation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {election?.candidates &&
              election.candidates.map((c, index) => (
                <TableRow key={index}>
                  <TableCell size="small">{index + 1}</TableCell>
                  <TableCell size="small">{c.name}</TableCell>
                  <TableCell size="small">{c.portfolio}</TableCell>
                  <TableCell size="small">{c.affiliation}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SizedBox height={(theme) => theme.spacing(1)} />
      <Title>Add Candidate</Title>
      <Stack>
        <RowContainer
          spacing={3}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Stack paddingTop={1}>
            <Stack
              width="117px"
              height="117px"
              borderRadius="5px"
              border={(theme) =>
                `1px solid ${alpha(theme.palette.common.black, 0.45)}`
              }
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              position="relative"
            >
              <img
                src={preview ?? resources.imagePlaceholder}
                alt="candidate-pic"
                className="img"
              />
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
          <Stack flex={1} spacing={1.5}>
            <CustomInput
              value={candidateRequest.name}
              name="name"
              placeholder="Full Name "
              label="Name"
              onChange={handleCandidateRequestForm}
            />
            <RowContainer>
              <CustomInput
                value={candidateRequest.affiliation}
                placeholder="Affiliation"
                name="affiliation"
                label="Affiliation"
                onChange={handleCandidateRequestForm}
              />
              <Stack flex={1}>
                <CustomSelect
                  value={candidateRequest.portfolio}
                  label="Portfolio"
                >
                  {election?.portfolios &&
                    election.portfolios.map((pf) => (
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
            </RowContainer>
          </Stack>
        </RowContainer>
      </Stack>
      <Stack>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton
            style={{ borderRadius: "8px", height: "40px", width: "150px" }}
            onClick={handleCreateCandidate}
          >
            Save
          </PrimaryButton>
        </RowContainer>
      </Stack>
    </Stack>
  );
}
