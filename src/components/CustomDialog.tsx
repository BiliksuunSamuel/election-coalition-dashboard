import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  alpha,
} from "@mui/material";
import { LiaTimesSolid } from "react-icons/lia";
import { IModalProps } from "../interfaces";

export default function CustomDialog({
  showCloseIcon = true,
  children,
  zIndex = 1001,
  ...others
}: IModalProps) {
  return (
    <Dialog
      sx={(theme) => ({
        zIndex,
        borderRadius: theme.spacing(0),
        ".MuiDialog-scrollPaper": {
          bgcolor: alpha(theme.palette.common.black, 0.18),
          padding: theme.spacing(2),
          justifyContent: "center",
          alignItems: "center",
        },
        ".MuiPaper-root": {
          borderRadius: theme.spacing(0.5),
          backgroundColor: theme.palette.background.paper,
        },
        justifyContent: "center",
        alignItems: "center",
      })}
      maxWidth="md"
      fullWidth
      {...others}
    >
      {showCloseIcon && (
        <DialogTitle>
          <Stack alignItems="center" justifyContent="flex-end" direction="row">
            <IconButton
              onClick={() => {
                others.onClose && others.onClose({}, "backdropClick");
              }}
              size="small"
            >
              <LiaTimesSolid />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}
      <DialogContent
        sx={(theme) => ({
          borderRadius: theme.spacing(1),
        })}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
