import { Stack, StackProps } from "@mui/material";
import { IElection } from "../../models/ElectionModel";
import { CustomOutlinedDisplay, PrimaryButton } from "../../components";
import { RowContainer } from "../../views";
import dayjs from "dayjs";

interface IProps extends StackProps {
  election: IElection | null;
  setShowElectionForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ElectionDetailsSection({
  election,
  setShowElectionForm,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} paddingX={2} {...others}>
      <CustomOutlinedDisplay label="Title" value={election?.title} />
      <CustomOutlinedDisplay label="Category" value={election?.category} />
      <CustomOutlinedDisplay
        label="Description"
        value={election?.description}
      />
      <RowContainer justifyContent="flex-start">
        <CustomOutlinedDisplay
          label="Start Date"
          value={dayjs(election?.startDate).format("DD MMMM YYYY")}
        />
        <CustomOutlinedDisplay
          label="End Date"
          value={dayjs(election?.endDate).format("DD MMMM YYYY")}
        />
      </RowContainer>
      <RowContainer justifyContent="flex-end">
        <PrimaryButton
          onClick={() => setShowElectionForm(true)}
          style={{ borderRadius: "10px", width: "150px", height: "40px" }}
        >
          Edit Details
        </PrimaryButton>
      </RowContainer>
    </Stack>
  );
}
