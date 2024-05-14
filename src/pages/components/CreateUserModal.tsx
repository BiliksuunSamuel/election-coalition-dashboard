import { IconButton, Stack, alpha } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  Paragraph,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { ConstituenciesMenuView, RowContainer } from "../../views";
import { IModalProps } from "../../interfaces";
import { ICreateUserRequest } from "../../models/UserModel";
import { ChangeEvent, useState } from "react";
import { IConstituency } from "../../models/ElectionModel";

interface IProps extends IModalProps {
  handleClose?: () => void;
  request: ICreateUserRequest;
  handleForm: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleSubmit?: () => void;
  setCreateRequest: React.Dispatch<React.SetStateAction<ICreateUserRequest>>;
  constituencies: IConstituency[];
}
export default function CreateUserModal({
  handleClose,
  handleForm,
  request,
  handleSubmit,
  setCreateRequest,
  loading,
  constituencies,
  ...others
}: IProps) {
  const [constituenciesMenu, setConstituenciesMenu] =
    useState<HTMLElement | null>(null);
  return (
    <CustomDialog maxWidth="sm" fullWidth {...others} showCloseIcon={false}>
      <ConstituenciesMenuView
        open={Boolean(constituenciesMenu)}
        onClose={() => setConstituenciesMenu(null)}
        anchorEl={constituenciesMenu}
        constituencies={constituencies.map((c) => c.name)}
        selected={request.constituencies}
        handleItemClick={(item) => {
          if (request.constituencies.includes(item)) {
            setCreateRequest({
              ...request,
              constituencies: request.constituencies.filter((x) => x !== item),
            });
          } else {
            setCreateRequest({
              ...request,
              constituencies: [...request.constituencies, item],
            });
          }
        }}
      />
      <Stack padding={4}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Add User</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <SizedBox height={(theme) => theme.spacing(2)} />
        <Stack spacing={1.85}>
          <CustomInput
            name="name"
            onChange={handleForm}
            placeholder="Enter FullName"
            label="Name"
            value={request.name}
          />
          <CustomInput
            placeholder="Email Address"
            label="Email"
            name="email"
            onChange={handleForm}
            value={request.email}
          />
          <CustomInput
            label="PhoneNumber"
            placeholder="PhoneNumber"
            name="phoneNumber"
            onChange={handleForm}
          />
          <CustomInput
            name="membershipId"
            label="Membership ID"
            placeholder="Membership ID"
            onChange={handleForm}
          />

          <CustomInput
            label="Address"
            placeholder="Address"
            name="address"
            multiline
            minRows={2}
            onChange={handleForm}
          />

          <Stack>
            <Paragraph variant="caption">Constituencies</Paragraph>
            <IconButton
              sx={(theme) => ({
                border: `1px solid ${alpha(theme.palette.common.black, 0.15)}`,
                padding: theme.spacing(0.5),
                borderRadius: theme.spacing(0.5),
                height: "40px",
              })}
              onClick={(e) => setConstituenciesMenu(e.currentTarget)}
            >
              <Paragraph variant="body2">
                --- Select Constituencies ---
              </Paragraph>
            </IconButton>
          </Stack>

          <RowContainer justifyContent="flex-end" width="100%">
            <PrimaryButton
              loading={loading}
              disabled={loading}
              style={{ width: "120px" }}
              onClick={handleSubmit}
            >
              Submit
            </PrimaryButton>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
