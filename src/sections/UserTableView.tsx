import {
  LinearProgress,
  Paper,
  Stack,
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
import IUser from "../models/UserModel";
import { RowContainer } from "../views";
import { PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  loading: boolean;
  users: IUser[];
}

export default function UserTableView({ loading, users, ...others }: IProps) {
  const theme = useTheme();
  return (
    <TableContainer variant="outlined" component={Paper} {...others}>
      {loading && (
        <Stack marginTop={1} width="100%">
          <LinearProgress variant="indeterminate" />
        </Stack>
      )}
      <Table width="100%" size="medium">
        <TableHead>
          <TableRow
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.085),
            })}
          >
            <TableCell size="small" align="left">
              Name
            </TableCell>
            <TableCell size="small" align="left">
              Phone Number
            </TableCell>
            <TableCell size="small" align="left">
              Email
            </TableCell>
            <TableCell size="small" align="left">
              Constituency
            </TableCell>
            <TableCell size="small" align="left">
              Polling Station
            </TableCell>
            <TableCell size="small" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((c) => (
            <TableRow key={c.id}>
              <TableCell size="small" align="left">
                {c.name}
              </TableCell>
              <TableCell size="small" align="left">
                {c.phoneNumber}
              </TableCell>
              <TableCell size="small" align="left">
                {c.email}
              </TableCell>
              <TableCell size="small" align="left">
                {c.constituency}
              </TableCell>
              <TableCell size="small" align="left">
                {c.pollingStation}
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
