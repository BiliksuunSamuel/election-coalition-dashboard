import { ModalProps, Stack } from "@mui/material";
import {
  CustomCloseButton,
  CustomDatePicker,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { RowContainer } from "../../views";

interface IProps extends ModalProps {}
export default function CreateElectionModal({ ...others }: IProps) {
  return (
    <CustomDialog maxWidth="sm" fullWidth {...others} showCloseIcon={false}>
      <Stack padding={4}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Add Election</Title>
          <CustomCloseButton />
        </RowContainer>
        <SizedBox height={(theme) => theme.spacing(2)} />
        <Stack spacing={1.5}>
          <CustomInput placeholder="Enter Election Title" label="Title" />
          <CustomSelect label="Category"></CustomSelect>
          <CustomDatePicker label="Start Date" />
          <SizedBox height={(theme) => theme.spacing(1)} />
          <PrimaryButton style={{ height: "45px" }}>Submit</PrimaryButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
