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
import { IConstituency } from "../models/ConstituencyModel";
import { RowContainer } from "../views";
import { PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  constituencies: IConstituency[];
  handleSelectConstituency: (constituency: IConstituency) => void;
  loading: boolean;
  handleDeleteConstituency: (constituency: IConstituency) => void;
}
export default function ConstituencyTableView({
  constituencies,
  handleSelectConstituency,
  loading,
  handleDeleteConstituency,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} variant="outlined" {...others}>
      <Table>
        <TableHead>
          <TableRow
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.085),
            })}
          >
            <TableCell>Constituency Name</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell align="center">Polling Stations</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {constituencies.map((constituency) => (
            <TableRow key={constituency.id}>
              <TableCell>{constituency.name}</TableCell>
              <TableCell>{constituency.createdBy}</TableCell>
              <TableCell align="center">
                {constituency.totalPollingStations ?? 0}
              </TableCell>
              <TableCell size="small" align="center">
                <RowContainer justifyContent="center">
                  <PrimaryButton
                    color="error"
                    variant="outlined"
                    size="small"
                    style={{
                      color: loading ? undefined : theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                    }}
                    disabled={loading}
                    onClick={() => handleDeleteConstituency(constituency)}
                  >
                    Delete
                  </PrimaryButton>
                  <PrimaryButton
                    style={{
                      color: loading ? undefined : theme.palette.info.main,
                      borderColor: theme.palette.info.main,
                    }}
                    size="small"
                    disabled={loading}
                    variant="outlined"
                    onClick={() => handleSelectConstituency(constituency)}
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
