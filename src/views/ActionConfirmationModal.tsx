import { Stack } from "@mui/material";
import CustomDialog from "../components/CustomDialog";
import { IModalProps } from "../interfaces";
import Title from "../components/Title";
import { Paragraph, PrimaryButton, SizedBox } from "../components";
import RowContainer from "./RowContainer";
import { BlackShades } from "../theme/AppColors";

interface IProps extends IModalProps {
  handleClose?: () => void;
  handelConfirm?: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}
export default function ActionConfirmationModal({
  handleClose,
  handelConfirm,
  title,
  message,
  loading = false,
  ...others
}: IProps) {
  return (
    <CustomDialog maxWidth="xs" showCloseIcon={false} {...others}>
      <Stack justifyContent="center" alignItems="center">
        <Stack spacing={1.5} maxWidth="300px">
          <Title variant="h5" textAlign="center">
            {title}
          </Title>
          <Paragraph style={{ color: BlackShades[500] }} textAlign="center">
            {message}
          </Paragraph>
          <SizedBox height={5} />
          <RowContainer spacing={2}>
            <PrimaryButton
              style={{ height: "35px" }}
              onClick={handleClose}
              variant="text"
              disabled={loading}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              disabled={loading}
              style={{ height: "35px" }}
              onClick={handelConfirm}
            >
              Proceed
            </PrimaryButton>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
