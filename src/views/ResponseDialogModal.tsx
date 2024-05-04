import { Stack } from "@mui/material";
import { IModalProps } from "../interfaces";
import { FaCheck } from "react-icons/fa6";
import Title from "../components/Title";
import { CustomDialog, Paragraph, PrimaryButton } from "../components";
import { FaTimes } from "react-icons/fa";

interface IProps extends IModalProps {
  handleDone?: () => void;
  variant?: "success" | "error";
  title?: string;
  message?: string;
}
export default function ResponseDialogModal({
  handleDone,
  variant = "success",
  title,
  message,
  ...others
}: IProps) {
  return (
    <CustomDialog maxWidth="xs" showCloseIcon={false} {...others}>
      <Stack>
        <Stack
          maxWidth="300px"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          alignSelf="center"
        >
          <Stack
            width="40px"
            height="40px"
            borderRadius="100%"
            alignItems="center"
            justifyContent="center"
            border={(theme) =>
              `3px solid ${
                variant === "success"
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }`
            }
            color={(theme) =>
              variant === "success"
                ? theme.palette.success.dark
                : theme.palette.error.main
            }
          >
            {variant === "success" ? <FaCheck fontSize={38} /> : <FaTimes />}
          </Stack>
          <Title textAlign="center">{title}</Title>
          <Paragraph textAlign="center">{message}</Paragraph>
          <PrimaryButton
            onClick={handleDone}
            style={{ height: "30px" }}
            size="small"
          >
            Done
          </PrimaryButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
