import {
  Grid,
  Skeleton,
  Stack,
  StackProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IProps extends StackProps {}
export default function DashboardSummaryLoader({ ...others }: IProps) {
  const isMobileDevice = useMediaQuery(
    useTheme().breakpoints.between("xs", "sm")
  );
  return (
    <Stack width="100%" {...others}>
      <Grid
        container
        justifyContent={isMobileDevice ? "center" : "inherit"}
        rowSpacing={2}
        columnSpacing={2}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid md={4} lg={3} xl={3} sm={6} xs={10} item>
            <Skeleton key={index} variant="rounded" height={70} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
