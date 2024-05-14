import {
  Divider,
  IconButton,
  MenuProps,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { MenuView, Paragraph } from "../components";
import RowContainer from "./RowContainer";
import { VscClearAll } from "react-icons/vsc";

interface IProps extends MenuProps {
  selected: string[];
  constituencies: string[];
  handleItemClick: (item: string) => void;
}
export default function ConstituenciesMenuView({
  selected,
  constituencies,
  handleItemClick,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <MenuView
      sx={(theme) => ({
        ".MuiPaper-root": {
          borderRadius: theme.spacing(1.5),
          padding: 0,
          width: "350px",
          marginRight: "100px",
          maxHeight: "340px",
          marginLeft: -8,
          overflow: "hidden",
        },
        ".MuiList-root": {
          padding: 0,
        },
      })}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...others}
    >
      <Stack>
        <RowContainer justifyContent="space-between" padding={1}>
          <Paragraph>Select Constituencies</Paragraph>
          <IconButton size="small">
            <VscClearAll />
          </IconButton>
        </RowContainer>
        <Divider />
        <RowContainer
          spacing={0}
          justifyContent="flex-start"
          alignItems="flex-start"
          overflow="hidden"
        >
          <Stack
            style={{
              overflowY: "scroll",
              height: "240px",
            }}
            flex={1.25}
          >
            <RadioGroup name="year">
              {constituencies.sort().map((c) => (
                <IconButton
                  style={{ borderRadius: 0, height: "30px" }}
                  size="small"
                  key={c}
                  onClick={() => handleItemClick(c)}
                >
                  <RowContainer
                    justifyContent="flex-start"
                    padding={0}
                    spacing={0}
                    width="100%"
                  >
                    <Radio
                      checked={selected.includes(c)}
                      size={"xsmall" as any}
                      value={c}
                    />
                    <Paragraph fontSize={theme.spacing(1.75)}>{c}</Paragraph>
                  </RowContainer>
                </IconButton>
              ))}
            </RadioGroup>
          </Stack>
        </RowContainer>
        <IconButton
          style={{
            borderRadius: 0,
            background: alpha(theme.palette.error.main, 0.055),
          }}
        >
          <Typography variant="body2">Apply Filter</Typography>
        </IconButton>
      </Stack>
    </MenuView>
  );
}
