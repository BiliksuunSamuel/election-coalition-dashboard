import {
  Grid,
  Stack,
  StackProps,
  colors,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import StatisticsSummaryCard from "./StatisticsSummaryCard";
import { IDashboardSummaryResponse } from "../../models/ReportsModel";
import { FcCancel } from "react-icons/fc";
import { ImCheckboxChecked } from "react-icons/im";
import { MdLocalLibrary, MdPending } from "react-icons/md";
import { PrimaryShadeds } from "../../theme/AppColors";

interface IProps extends StackProps {
  data: IDashboardSummaryResponse;
  loading: boolean;
  categories: string[];
  handleGetProductsSoldCount?: (val: any) => void;
  handleGetProductsCount?: (val: any) => void;
  handleGetTotalSales?: (val: any) => void;
  handleGetOutstandingSales?: (val: any) => void;
  loadingProductSoldCount?: boolean;
  loadingProductsCount?: boolean;
  loadingTotalSales?: boolean;
  loadingOutstandingSales?: boolean;
}
export default function DasboardSummaryCardView({
  data,
  categories,
  handleGetProductsSoldCount,
  loadingProductSoldCount,
  loading,
  handleGetProductsCount,
  loadingProductsCount,
  loadingTotalSales,
  loadingOutstandingSales,
  handleGetOutstandingSales,
  handleGetTotalSales,
  ...others
}: IProps) {
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
        <StatisticsSummaryCard
          value={data.totalSales}
          valuePrefix={""}
          title="Total Votes"
          Icon={MdLocalLibrary}
          activeColor={PrimaryShadeds[500]}
          label="+5.5%"
          loading={loading || loadingTotalSales}
          isSaleView
          handleFilterValue={handleGetTotalSales}
          isMoney
        />
        <StatisticsSummaryCard
          value={data.totalOutstandingPayments}
          valuePrefix={""}
          title="Approved Votes"
          Icon={ImCheckboxChecked}
          activeColor={colors.green[900]}
          label="+9.3%"
          loading={loading || loadingOutstandingSales}
          isSaleView
          handleFilterValue={handleGetOutstandingSales}
          isMoney
        />
        <StatisticsSummaryCard
          value={data.productsSoldCount}
          title="Pending Votes"
          Icon={MdPending}
          activeColor={colors.orange[600]}
          label="+6.9%"
          actionButtonTitle="Category"
          filterItems={categories}
          handleFilterValue={handleGetProductsSoldCount}
          loading={loading || loadingProductSoldCount}
        />
        <StatisticsSummaryCard
          value={data.totalProducts}
          title="Total Rejected Votes"
          Icon={FcCancel}
          activeColor={colors.green[600]}
          label="+5.5%"
          actionButtonTitle="Category"
          filterItems={categories}
          handleFilterValue={handleGetProductsCount}
          loading={loading || loadingProductsCount}
        />
      </Grid>
    </Stack>
  );
}
