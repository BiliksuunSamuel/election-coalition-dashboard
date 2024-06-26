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
import IUser from "../models/UserModel";
import { RowContainer } from "../views";
import { PrimaryButton } from "../components";

interface IProps extends TableContainerProps {
  loading: boolean;
  users: IUser[];
  handleViewDetails: (user: IUser) => void;
  handleDeleteUser: (user: IUser) => void;
}

export default function UserTableView({
  loading,
  handleViewDetails,
  users,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer variant="outlined" component={Paper} {...others}>
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
              Role
            </TableCell>
            <TableCell size="small" align="center">
              Status
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
                {c.role}
              </TableCell>
              <TableCell size="small" align="center">
                {c.status}
              </TableCell>
              <TableCell size="small" align="center">
                <RowContainer justifyContent="center">
                  <PrimaryButton
                    style={{
                      color: loading ? undefined : theme.palette.info.main,
                      borderColor: theme.palette.info.main,
                      height: "35px",
                    }}
                    size="small"
                    disabled={loading}
                    variant="outlined"
                    onClick={() => handleViewDetails(c)}
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
