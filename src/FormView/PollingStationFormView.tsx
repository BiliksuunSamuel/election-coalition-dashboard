import { MenuItem, Stack } from "@mui/material";
import { IModalProps } from "../interfaces";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
  Title,
} from "../components";
import { RowContainer } from "../views";
import { IPollingStationRequest } from "../models/ConstituencyModel";

interface IProps extends IModalProps {
  handleClose?: () => void;
  request: IPollingStationRequest;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  loading: boolean;
}

export default function PollingStationFormView({
  handleClose,
  request,
  handleFormChange,
  handleSubmit,
  loading,
  ...others
}: IProps) {
  return (
    <CustomDialog fullWidth showCloseIcon={false} maxWidth="sm" {...others}>
      <Stack spacing={2}>
        <RowContainer justifyContent="space-between">
          <Title>Polling Station Details</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Stack spacing={2}>
          <CustomInput
            name="name"
            label="Name"
            placeholder="Enter Polling Station Name"
            value={request.name}
            onChange={handleFormChange}
          />
          <CustomInput
            name="code"
            label="Polling Station Code"
            placeholder="Enter Polling Station Code"
            value={request.code}
            onChange={handleFormChange}
          />
          <CustomSelect
            label="Status"
            value={request.status}
            defaultValue={request.status}
          >
            {["Open", "Closed"].map((status) => (
              <MenuItem
                onClick={() =>
                  handleFormChange({
                    target: {
                      name: "status",
                      value: status,
                    },
                  } as any)
                }
                key={status}
                value={status}
              >
                {status}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomInput
            name="address"
            label="Addess / Location"
            placeholder="Enter polling station center location/address/description"
            multiline
            minRows={3}
            value={request.address}
            onChange={handleFormChange}
          />
        </Stack>
        <RowContainer justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
          >
            Save Changes
          </PrimaryButton>
        </RowContainer>
      </Stack>
    </CustomDialog>
  );
}
