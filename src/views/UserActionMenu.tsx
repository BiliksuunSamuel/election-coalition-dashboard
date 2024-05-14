import { MenuProps } from "@mui/material";
import { MenuItemView, MenuView } from "../components";
import { UserStatus } from "../enums/UserStatus";
import IUser from "../models/UserModel";

interface IProps extends MenuProps {
  handleUpdate?: () => void;
  handleActivate?: () => void;
  handleDeactivate?: () => void;
  selectedUser: IUser | null;
}
export default function UserActionMenu({
  handleActivate,
  handleUpdate,
  handleDeactivate,
  selectedUser,
  ...others
}: IProps) {
  return (
    <MenuView
      sx={(theme) => ({
        ".MuiPaper-root": {
          borderRadius: theme.spacing(1.5),
          padding: 0,
          marginLeft: -3,
          width: "120px",
        },
        ".MuiList-root": {
          padding: 0,
        },
      })}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...others}
    >
      <MenuItemView fontSize="16px" onClick={handleUpdate}>
        Update
      </MenuItemView>
      {selectedUser?.status === UserStatus.Inactive && (
        <MenuItemView fontSize="16px" onClick={handleActivate}>
          Activate
        </MenuItemView>
      )}
      {selectedUser?.status === UserStatus.Active && (
        <MenuItemView fontSize="16px" onClick={handleDeactivate}>
          Deactivate
        </MenuItemView>
      )}
    </MenuView>
  );
}
