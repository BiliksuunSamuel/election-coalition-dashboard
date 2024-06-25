import {
  Grid,
  IconButton,
  Skeleton,
  Stack,
  StackProps,
  SvgIconTypeMap,
  alpha,
  useTheme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconType } from "react-icons";
import { Icon } from "iconsax-react";
import { useEffect, useState } from "react";
import { RowContainer } from "../../views";
import { Title } from "../../components";

interface IProps extends StackProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType | Icon;
  title?: string;
  value: number;
  activeColor?: any;
  label?: string | number;
  showActionButton?: boolean;
  actionButtonTitle?: string;
  filterItems?: string[];
  activeItem?: string;
  handleFilterValue?: (value: string) => void;
  loading?: boolean;
  valuePrefix?: string;
  isSaleView?: boolean;
  isMoney?: boolean;
}
export default function StatisticsSummaryCard({
  Icon,
  title,
  value,
  activeColor,
  label,
  showActionButton = true,
  actionButtonTitle = "Filter",
  filterItems = [],
  activeItem,
  handleFilterValue,
  loading = false,
  valuePrefix,
  isSaleView,
  isMoney = false,
  ...others
}: IProps) {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  let countTimer: any;
  const updateCount = () => {
    const step = Math.ceil(value / 60);
    let currentCount = 0;
    const countTimer = setInterval(() => {
      currentCount = Math.min(currentCount + step, value);
      setCount(currentCount);
      if (currentCount >= value) {
        clearInterval(countTimer);
      }
    }, 15);
  };

  useEffect(() => {
    updateCount();
    return () => {
      if (countTimer) {
        clearInterval(countTimer);
      }
    };
  }, []);

  useEffect(() => {
    updateCount();
    return () => {
      if (countTimer) {
        clearInterval(countTimer);
      }
    };
  }, [value]);
  return (
    <Grid md={4} lg={3} xl={3} sm={6} xs={10} item>
      {!loading && (
        <Stack
          spacing={1}
          sx={(theme) => ({
            borderRadius: theme.spacing(1),
            padding: theme.spacing(2),
          })}
          className="stats-card"
          {...others}
        >
          <RowContainer
            justifyContent={showActionButton ? "space-between" : "flex-start"}
          >
            <Icon fontSize="large" color={activeColor ?? "inherit"} />
            {showActionButton && (
              <IconButton
                style={{
                  borderRadius: 0,
                  height: 25,
                  fontSize: theme.spacing(2),
                }}
                sx={{
                  "&:hover": {
                    bgcolor: alpha(theme.palette.action.hover, 0.015),
                  },
                }}
                size="small"
              ></IconButton>
            )}
          </RowContainer>
          <Title style={{ width: "80%" }} fontWeight="400" variant="caption">
            {title}
          </Title>
          <RowContainer justifyContent="space-between">
            <Title variant="body1" fontWeight="500">
              {count}
            </Title>
            {/* <Paragraph color={activeColor} variant="caption">
              {label}
            </Paragraph> */}
          </RowContainer>
        </Stack>
      )}
      {loading && <Skeleton variant="rounded" height={100} />}
    </Grid>
  );
}
