import { Divider, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useUser from "../../hooks/useUser";
import {
  ContentContainer,
  FluidContainer,
  ResponseModal,
  RowContainer,
} from "../../views";
import { clearResponse } from "../../features/ResponseReducer";
import { CustomInput, CustomLoader } from "../../components";

export default function ProfileSettingsPage() {
  const { user } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const { handleCreateUserForm } = useUser();
  const { error, message, loading } = useAppSelector(
    (state) => state.ResponseReducer
  );

  return (
    <FluidContainer>
      <CustomLoader open={loading} />
      <ResponseModal
        variant="success"
        open={Boolean(message)}
        message={message}
        title="Success"
        handleDone={() => {
          dispatch(clearResponse());
        }}
      />
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />
      <ContentContainer spacing={2}>
        <Stack width="100%" spacing={2} padding={2}>
          <Typography variant="h5">Profile Details</Typography>
          <Divider />
          {user && (
            <Stack width="100%" spacing={1.85}>
              <RowContainer>
                <CustomInput
                  name="name"
                  placeholder="Enter FullName"
                  label="Name"
                  value={user.name}
                  readOnly
                />
                <CustomInput
                  placeholder="Email Address"
                  label="Email"
                  name="email"
                  value={user.email}
                  readOnly
                />
              </RowContainer>

              <RowContainer>
                <CustomInput
                  label="PhoneNumber"
                  placeholder="PhoneNumber"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  readOnly
                />
                <CustomInput
                  label="Membership ID"
                  value={user.membershipId}
                  readOnly
                />
              </RowContainer>

              <RowContainer>
                <CustomInput
                  label="Constituency"
                  onChange={handleCreateUserForm}
                  value={user.constituency}
                  readOnly
                />
                <CustomInput
                  label="Polling Station"
                  value={user.pollingStation}
                  readOnly
                />
              </RowContainer>

              <CustomInput
                label="Address"
                placeholder="Address"
                name="address"
                value={user.address}
                readOnly
              />
              <RowContainer>
                <CustomInput label="Role" readOnly value={user.role} />

                <CustomInput label="Status" readOnly value={user.role} />
              </RowContainer>
            </Stack>
          )}
        </Stack>
      </ContentContainer>
    </FluidContainer>
  );
}
