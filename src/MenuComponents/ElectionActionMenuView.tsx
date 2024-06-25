import { Menu, MenuItem, MenuProps } from "@mui/material";

interface IProps extends MenuProps {
  handleEdit: () => void;
  handleDelete: () => void;
}
export default function ElectionActionMenuView({
  handleEdit,
  handleDelete,
  ...others
}: IProps) {
  return (
    <Menu {...others}>
      <MenuItem onClick={handleEdit}>View Details</MenuItem>
      <MenuItem onClick={handleEdit}>Delete</MenuItem>
    </Menu>
  );
}
