import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { ICandidate } from "../models/CandidateModel";
import { RowContainer } from "../views";
import { CustomStatusChip, PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  candidates: ICandidate[];
  loading: boolean;
  handleEdit: (data: ICandidate) => void;
  handleDelete: (data: ICandidate) => void;
}

export default function CandidateTableView({
  candidates,
  loading,
  handleDelete,
  handleEdit,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} variant="outlined" {...others}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Party</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.portfolio}</TableCell>
              <TableCell>{c.partyShortName}</TableCell>
              <TableCell>
                <CustomStatusChip value={c.status} />
              </TableCell>
              <TableCell>
                <RowContainer justifyContent="center">
                  <PrimaryButton
                    color="error"
                    variant="outlined"
                    size="small"
                    style={{
                      color: loading ? undefined : theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      height: "35px",
                      width: "35px",
                    }}
                    onClick={() => handleDelete(c)}
                  >
                    Delete
                  </PrimaryButton>
                  <PrimaryButton
                    color="primary"
                    variant="outlined"
                    size="small"
                    style={{
                      color: loading ? undefined : theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      height: "35px",
                      width: "35px",
                    }}
                    onClick={() => handleEdit(c)}
                  >
                    View
                  </PrimaryButton>
                </RowContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
