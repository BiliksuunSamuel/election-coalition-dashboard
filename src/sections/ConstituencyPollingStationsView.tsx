import {
  Divider,
  Stack,
  StackProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { CustomPaginationView, RowContainer } from "../views";
import { PrimaryButton, SearchInput } from "../components";
import { IPollingStation } from "../models/ConstituencyModal";

interface IProps extends StackProps {
  handleCreatePollingStation?: () => void;
  loading: boolean;
  pollingStations: IPollingStation[];
}
export default function ConstituencyPollingStationsView({
  handleCreatePollingStation,
  loading,
  pollingStations,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <Stack spacing={2} {...others}>
      <RowContainer justifyContent="flex-end">
        <SearchInput placeholder="Name,Code...." />
        <PrimaryButton
          disabled={loading}
          loading={loading}
          onClick={handleCreatePollingStation}
        >
          Add Polling Station
        </PrimaryButton>
      </RowContainer>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableHead>
          <TableBody>
            {pollingStations.map((pollingStation) => (
              <TableRow>
                <TableCell>{pollingStation.name}</TableCell>
                <TableCell>{pollingStation.code}</TableCell>
                <TableCell align="center">
                  <RowContainer justifyContent="center">
                    <PrimaryButton
                      color="error"
                      variant="outlined"
                      size="small"
                      style={{
                        color: theme.palette.error.main,
                        borderColor: theme.palette.error.main,
                      }}
                    >
                      Delete
                    </PrimaryButton>
                    <PrimaryButton
                      style={{
                        color: theme.palette.info.main,
                        borderColor: theme.palette.info.main,
                      }}
                      size="small"
                      variant="outlined"
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
      <CustomPaginationView
        page={1}
        pageSize={10}
        totalCount={0}
        totalPages={0}
      />
    </Stack>
  );
}