import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
} from "@mui/material";
import { IConstituency } from "../models/ConstituencyModal";
import { MdMoreVert } from "react-icons/md";

interface IProps extends TableContainerProps {
  constituencies: IConstituency[];
  handleSelectConstituency: (constituency: IConstituency) => void;
}
export default function ConstituencyTableView({
  constituencies,
  handleSelectConstituency,
  ...others
}: IProps) {
  return (
    <TableContainer {...others}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Constituency Name</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell align="center">Polling Stations</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {constituencies.map((constituency) => (
            <TableRow key={constituency.id}>
              <TableCell size="small">{constituency.name}</TableCell>
              <TableCell size="small">{constituency.createdBy}</TableCell>
              <TableCell size="small" align="center">
                {constituency.totalPollingStations ?? 0}
              </TableCell>
              <TableCell size="small" align="center">
                <IconButton
                  onClick={() => handleSelectConstituency(constituency)}
                >
                  <MdMoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
