import { MenuItem, Stack } from "@mui/material";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { RowContainer } from "../../views";
import { IModalProps } from "../../interfaces";
import { ICreateUserRequest } from "../../models/UserModel";
import { ChangeEvent } from "react";
import { IConstituency, IPollingStation } from "../../models/ConstituencyModel";

interface IProps extends IModalProps {
  handleClose?: () => void;
  request: ICreateUserRequest;
  handleForm: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleSubmit?: () => void;
  setCreateRequest: React.Dispatch<React.SetStateAction<ICreateUserRequest>>;
  constituencies: IConstituency[];
  pollingStations: IPollingStation[];
}
export default function CreateUserModal({
  handleClose,
  handleForm,
  request,
  handleSubmit,
  setCreateRequest,
  loading,
  constituencies,
  pollingStations,
  ...others
}: IProps) {
  return (
    <CustomDialog maxWidth="md" fullWidth {...others} showCloseIcon={false}>
      <Stack padding={2}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Add User</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <SizedBox height={(theme) => theme.spacing(2)} />
        <Stack spacing={1.85}>
          <RowContainer>
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
          </RowContainer>

          <RowContainer>
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
          </RowContainer>

          <RowContainer>
            <Stack flex={1}>
              <CustomSelect
                value={request.constituency}
                defaultValue={request.constituency}
                label="Constituency"
              >
                {constituencies.map((constituency) => (
                  <MenuItem
                    key={constituency.name}
                    onClick={() =>
                      setCreateRequest({
                        ...request,
                        constituency: constituency.name,
                        constituencyId: constituency.id,
                        pollingStation: "",
                        pollingStationId: "",
                        pollingStationCode: "",
                      })
                    }
                    value={constituency.name}
                  >
                    {constituency.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Stack>
            <Stack flex={1}>
              <CustomSelect
                value={request.pollingStation}
                defaultValue={request.pollingStation}
                label="Polling Station"
              >
                {pollingStations.map((station) => (
                  <MenuItem
                    onClick={() => {
                      setCreateRequest({
                        ...request,
                        pollingStation: station.name,
                        pollingStationId: station.id,
                        pollingStationCode: station.code,
                      });
                    }}
                    key={station.name}
                    value={station.name}
                  >
                    {station.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Stack>
          </RowContainer>

          <CustomInput
            label="Address"
            placeholder="Address"
            name="address"
            multiline
            minRows={3}
            onChange={handleForm}
          />

          <RowContainer justifyContent="flex-end" width="100%">
            <PrimaryButton
              loading={loading}
              disabled={loading}
              style={{ minWidth: "150px" }}
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
