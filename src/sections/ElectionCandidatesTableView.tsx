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
import { IElectionCandidate } from "../models/ElectionModel";
import { RowContainer } from "../views";
import { PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  candidates: IElectionCandidate[];
  loading: boolean;
}
export default function ElectionCandidatesTableView({
  candidates,
  loading,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} variant="outlined" {...others}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small">No.</TableCell>
            <TableCell size="small">Name</TableCell>
            <TableCell size="small">Portfolio</TableCell>
            <TableCell size="small">Affialiation</TableCell>
            <TableCell align="center" size="small">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((c, index) => (
            <TableRow key={index}>
              <TableCell size="small">{index + 1}</TableCell>
              <TableCell size="small">{c.name}</TableCell>
              <TableCell size="small">{c.portfolio}</TableCell>
              <TableCell size="small">{c.affiliation}</TableCell>
              <TableCell size="small">
                <RowContainer justifyContent="center">
                  <PrimaryButton
                    color="error"
                    variant="outlined"
                    size="small"
                    style={{
                      color: loading ? undefined : theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      height: "35px",
                    }}
                    disabled={loading}
                  >
                    Delete
                  </PrimaryButton>
                  <PrimaryButton
                    style={{
                      color: loading ? undefined : theme.palette.info.main,
                      borderColor: theme.palette.info.main,
                      height: "35px",
                    }}
                    size="small"
                    disabled={loading}
                    variant="outlined"
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
