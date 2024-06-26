import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
  alpha,
  useTheme,
} from "@mui/material";
import { IElection } from "../models/ElectionModel";
import dayjs from "dayjs";
import { RowContainer } from "../views";
import { PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  elections: IElection[];
  loading: boolean;
  handleViewElection: (election: IElection) => void;
  handleDeleteElection: (election: IElection) => void;
}
export default function ElectionTableView({
  loading,
  elections,
  handleDeleteElection,
  handleViewElection,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer variant="outlined" component={Paper} {...others}>
      <Table width="100%">
        <TableHead>
          <TableRow
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.085),
            })}
          >
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elections.map((c) => (
            <TableRow key={c.id}>
              <TableCell align="left">{c.title}</TableCell>
              <TableCell align="left">{c.category}</TableCell>
              <TableCell align="left">
                {dayjs(c.startDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="left">
                {dayjs(c.startDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
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
                    onClick={() => handleDeleteElection(c)}
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
                    onClick={() => handleViewElection(c)}
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
