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
import { PrimaryButton } from "../components";
import { RowContainer } from "../views";
import { IParty } from "../models/PartyModel";

interface IProps extends TableContainerProps {
  parties: IParty[];
  loading: boolean;
  handleEdit: (party: IParty) => void;
  handleShowDeleteModal: (party: IParty) => void;
}
export default function PartyTableView({
  parties,
  loading,
  handleShowDeleteModal,
  handleEdit,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} variant="outlined" {...others}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>ShortName</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parties.map((party) => (
            <TableRow key={party.id}>
              <TableCell>{party.name}</TableCell>
              <TableCell>{party.shortName}</TableCell>
              <TableCell>{party.status}</TableCell>
              <TableCell align="center">
                <RowContainer padding={0}>
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
                    onClick={() => handleShowDeleteModal(party)}
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
                    onClick={() => handleEdit(party)}
                  >
                    Edit
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
