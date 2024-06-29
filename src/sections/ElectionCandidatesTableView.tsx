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
import { RowContainer } from "../views";
import { CustomStatusChip, PrimaryButton } from "../components";
import { IPagedResults } from "../interfaces";
import { ICandidate } from "../models/CandidateModel";
import { UserStatus } from "../enums/UserStatus";

interface IProps extends TableContainerProps {
  candidates: IPagedResults<ICandidate>;
  loading: boolean;
  handleUpdateStatus: (data: ICandidate) => void;
}
export default function ElectionCandidatesTableView({
  candidates,
  loading,
  handleUpdateStatus,
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
            <TableCell size="small">Position</TableCell>
            <TableCell size="small">Party</TableCell>
            <TableCell align="center" size="small">
              Status
            </TableCell>
            <TableCell align="center" size="small">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.results.map((c, index) => (
            <TableRow key={index}>
              <TableCell size="small">{index + 1}</TableCell>
              <TableCell size="small">{c.name}</TableCell>
              <TableCell size="small">{c.portfolio}</TableCell>
              <TableCell size="small">{c.partyName}</TableCell>
              <TableCell align="center">
                <CustomStatusChip value={c.status} />
              </TableCell>
              <TableCell size="small">
                <RowContainer justifyContent="center">
                  <PrimaryButton
                    style={{
                      color: loading
                        ? undefined
                        : c.status === UserStatus.Active
                        ? theme.palette.success.main
                        : theme.palette.warning.main,
                      borderColor:
                        c.status === UserStatus.Active
                          ? theme.palette.success.main
                          : theme.palette.warning.main,
                      height: "35px",
                    }}
                    size="small"
                    disabled={loading}
                    variant="outlined"
                    onClick={() => handleUpdateStatus(c)}
                  >
                    {c.status === UserStatus.Active ? "Disable" : "Enable"}
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
