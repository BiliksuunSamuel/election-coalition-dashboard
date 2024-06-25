import { ChangeEvent } from "react";
import { IModalProps } from "../../interfaces";
import { ICategoryRequest } from "../../models/ElectionModel";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { Stack } from "@mui/material";
import { RowContainer } from "../../views";

interface IProps extends IModalProps {
  handleClose?: () => void;
  request: ICategoryRequest;
  handleForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  loading: boolean;
}

export default function CreateElectionCategoryModal({
  handleClose,
  handleSubmit,
  handleForm,
  loading,
  request,
  ...others
}: IProps) {
  return (
    <CustomDialog {...others} maxWidth="xs" fullWidth showCloseIcon={false}>
      <Stack padding={2} paddingTop={0}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Add Category</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <SizedBox height={(theme) => theme.spacing(2)} />
        <Stack spacing={2}>
          <CustomInput
            style={{ height: "40px" }}
            onChange={handleForm}
            name="title"
            value={request.title}
            placeholder="Enter category title"
            label="Category"
          />
          <PrimaryButton
            disabled={loading}
            loading={loading}
            style={{ height: "40px" }}
            onClick={handleSubmit}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
