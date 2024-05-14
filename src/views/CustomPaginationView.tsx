import {
  Pagination,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RowContainer from "./RowContainer";

interface IProps extends StackProps {
  totalPages: number;
  page: number;
  pageSize: number;
  totalCount: number;
  handlePage?: (_: any, p: number) => void;
}

export default function CustomPaginationView({
  totalPages,
  totalCount,
  page,
  pageSize,
  handlePage,
  ...others
}: IProps) {
  const startCount = Math.abs(page - 1) * pageSize;
  const endCount = totalCount > pageSize ? startCount + pageSize : totalCount;
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  return (
    <Stack padding={1} {...others}>
      <RowContainer justifyContent="space-between">
        {!isMobile && (
          <RowContainer spacing={0.85}>
            <Typography variant="body1">Items Selected</Typography>
            <Typography variant="body1" color="primary">
              {totalCount < pageSize ? totalCount : pageSize} Items
            </Typography>
          </RowContainer>
        )}
        <Pagination
          color="primary"
          shape="rounded"
          size="small"
          page={page}
          count={totalPages}
          onChange={handlePage}
        />
        <RowContainer>
          <Typography variant="body1">
            {`${!isMobile ? "Showing" : ""} ${
              startCount + 1
            } - ${endCount} of ${totalCount}`}
          </Typography>
        </RowContainer>
      </RowContainer>
    </Stack>
  );
}
