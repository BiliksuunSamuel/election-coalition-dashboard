import {
  Stack,
  StackProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RowContainer } from "../../views";
import { CustomInput, PrimaryButton } from "../../components";
import {
  IElection,
  IElectionPortfolioRequest,
} from "../../models/ElectionModel";
import { ChangeEvent } from "react";

interface IProps extends StackProps {
  request: IElectionPortfolioRequest;
  handleSubmit?: () => void;
  handleForm: (e: ChangeEvent<HTMLInputElement>) => void;
  election: IElection | null;
}
export default function ElectionPortfoliosSection({
  request,
  handleSubmit,
  handleForm,
  election,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} {...others}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">No.</TableCell>
              <TableCell size="small">Title</TableCell>
              <TableCell align="center" size="small">
                Number of Candidates
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {election?.portfolios &&
              election.portfolios.map((pf, index) => (
                <TableRow>
                  <TableCell size="small">{index + 1}</TableCell>
                  <TableCell size="small">{pf.title}</TableCell>
                  <TableCell align="center" size="small">
                    {0}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <RowContainer>
          <CustomInput
            name="title"
            onChange={handleForm}
            placeholder="Enter portfolio"
            value={request.title}
          />
          <PrimaryButton
            variant="outlined"
            style={{ borderRadius: "8px", height: "35px", width: "100px" }}
            disabled={!Boolean(request.title)}
            onClick={handleSubmit}
          >
            Add
          </PrimaryButton>
        </RowContainer>
      </Stack>
      <Stack>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton
            style={{ borderRadius: "8px", height: "40px", width: "150px" }}
          >
            Save
          </PrimaryButton>
        </RowContainer>
      </Stack>
    </Stack>
  );
}
