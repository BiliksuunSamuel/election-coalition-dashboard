import { InputBase, InputBaseProps, Paper } from "@mui/material";
import { CiSearch } from "react-icons/ci";
interface IProps extends InputBaseProps {}

export default function SearchInput({ ...others }: IProps) {
  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(0.65, 2),
        minWidth: "320px",
        borderRadius: theme.spacing(1),
      })}
      variant="outlined"
    >
      <CiSearch />
      <InputBase
        sx={(theme) => ({ ml: 1, flex: 1, fontSize: theme.spacing(1.5) })}
        placeholder="Search"
        type="search"
        {...others}
      />
    </Paper>
  );
}
