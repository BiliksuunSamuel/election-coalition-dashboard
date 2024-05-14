import { Stack, StackProps } from "@mui/material";
import { IElection } from "../../models/ElectionModel";
import { CustomDatePicker, CustomInput, PrimaryButton } from "../../components";
import { RowContainer } from "../../views";
import dayjs from "dayjs";

interface IProps extends StackProps {
  election: IElection | null;
}
export default function ElectionDetailsSection({
  election,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} paddingX={2} {...others}>
      <CustomInput value={election?.title} label="Title" />
      <CustomInput readOnly value={election?.category} label="Category" />
      <CustomInput
        label="Description"
        placeholder="Description"
        multiline
        minRows={2}
        value={election?.description}
      />
      <RowContainer justifyContent="flex-start">
        <CustomDatePicker
          label="Start Date"
          value={dayjs(election?.startDate)}
        />
        <CustomDatePicker label="End Date" value={dayjs(election?.endDate)} />
      </RowContainer>
      <RowContainer justifyContent="flex-end">
        <PrimaryButton
          style={{ borderRadius: "10px", width: "150px", height: "40px" }}
        >
          Save
        </PrimaryButton>
      </RowContainer>
    </Stack>
  );
}
