import { Divider, Stack, StackProps } from "@mui/material";
import { CustomPaginationView, RowContainer } from "../../views";
import { IElection } from "../../models/ElectionModel";
import { ElectionCandidatesTableView } from "../../sections";
import { IPagedResults } from "../../interfaces";
import { ICandidate } from "../../models/CandidateModel";
import { SearchInput } from "../../components";
import { UserStatus } from "../../enums/UserStatus";

interface IProps extends StackProps {
  election: IElection | null;
  loading: boolean;
  handleUpdateStatus: (data: ICandidate) => void;
  candidates: IPagedResults<ICandidate>;
  handleCandidateSearch: (query: string) => void;
  handleCandidateSelectedPage: (page: number) => void;
}
export default function ElectionCandidatesSection({
  election,
  loading,
  handleUpdateStatus,
  candidates,
  handleCandidateSearch,
  handleCandidateSelectedPage,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} {...others}>
      <Divider />
      <RowContainer justifyContent="flex-end">
        <SearchInput
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCandidateSearch(e.currentTarget.value);
            }
          }}
          placeholder="Search candidate"
        />
      </RowContainer>
      <Stack spacing={2}>
        <ElectionCandidatesTableView
          loading={loading}
          candidates={candidates}
          handleUpdateStatus={(data) =>
            handleUpdateStatus({
              ...data,
              status:
                data.status === UserStatus.Active
                  ? UserStatus.Inactive
                  : UserStatus.Active,
            })
          }
        />
        <CustomPaginationView
          page={candidates.page}
          pageSize={candidates.pageSize}
          totalCount={candidates.totalCount}
          totalPages={candidates.totalPages}
          handlePage={(page) => handleCandidateSelectedPage(page)}
        />
      </Stack>
    </Stack>
  );
}
