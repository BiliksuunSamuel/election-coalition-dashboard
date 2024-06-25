import { ChangeEvent } from "react";
import { IModalProps } from "../interfaces";
import { IParty, IPartyRequest } from "../models/PartyModel";
import {
  CustomCloseButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
} from "../components";
import RowContainer from "./RowContainer";
import { MenuItem, Stack, Typography } from "@mui/material";
import { PartyStatus } from "../enums/PartyStatus";

interface IProps extends IModalProps {
  handleClose: () => void;
  handleSubmit?: () => void;
  request: IPartyRequest;
  handleRequestForm: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  selectedParty: IParty | null;
  setSelectedParty: React.Dispatch<React.SetStateAction<IParty | null>>;
}
export default function CreatePartyModal({
  handleClose,
  handleRequestForm,
  handleSubmit,
  request,
  loading,
  ...others
}: IProps) {
  return (
    <CustomDialog showCloseIcon={false} fullWidth maxWidth="xs" {...others}>
      <Stack spacing={2}>
        <RowContainer justifyContent="space-between">
          <Typography fontWeight="bold"> Party Details</Typography>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Stack spacing={2}>
          <CustomInput
            label="Full Name"
            name="name"
            value={request.name}
            onChange={handleRequestForm}
          />
          <CustomInput
            label="Short Name"
            name="shortName"
            value={request.shortName}
            onChange={handleRequestForm}
          />
          <CustomSelect
            label="Status"
            name="status"
            value={request.status}
            onChange={(e) => handleRequestForm(e as any)}
          >
            {[PartyStatus.Active, PartyStatus.Inactive].map((status) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </CustomSelect>
          <RowContainer justifyContent="flex-end">
            <PrimaryButton
              disabled={loading}
              onClick={handleSubmit}
              loading={loading}
            >
              Save Changes
            </PrimaryButton>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
