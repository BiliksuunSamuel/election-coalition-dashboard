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
import { IPollingStation } from "../models/ConstituencyModel";
import { IPagedResults } from "../interfaces";

interface IProps extends StackProps {
  handleCreatePollingStation?: () => void;
  loading: boolean;
  pollingStations: IPagedResults<IPollingStation>;
  handleEditPollingStation: (pollingStation: IPollingStation) => void;
  handlePage: (page: number) => void;
  handleDeletePollingStation: (pollingStation: IPollingStation) => void;
}
export default function ConstituencyPollingStationsView({
  handleCreatePollingStation,
  loading,
  pollingStations,
  handleEditPollingStation,
  handlePage,
  handleDeletePollingStation,
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
            {pollingStations.results.map((pollingStation) => (
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
                        height: "35px",
                      }}
                      onClick={() => handleDeletePollingStation(pollingStation)}
                    >
                      Delete
                    </PrimaryButton>
                    <PrimaryButton
                      style={{
                        color: theme.palette.info.main,
                        borderColor: theme.palette.info.main,
                        height: "35px",
                      }}
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditPollingStation(pollingStation)}
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
        page={pollingStations.page}
        pageSize={pollingStations.pageSize}
        totalCount={pollingStations.totalCount}
        totalPages={pollingStations.totalPages}
        handlePage={(_, p) => handlePage(p)}
      />
    </Stack>
  );
}
