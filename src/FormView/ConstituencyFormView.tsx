import { MenuItem, Stack, StackProps } from "@mui/material";
import { CustomInput, CustomSelect, PrimaryButton } from "../components";
import { RowContainer } from "../views";
import { Regions } from "../data";
import { IConstituencyRequest } from "../models/ConstituencyModal";

interface IProps extends StackProps {
  request: IConstituencyRequest;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  loading: boolean;
}
export default function ConstituencyFormView({
  request,
  handleFormChange,
  handleSubmit,
  loading,
  ...others
}: IProps) {
  return (
    <Stack spacing={2} {...others}>
      <CustomInput
        label="Constituency Name"
        name="name"
        placeholder="Enter Constituency Name"
        value={request.name}
        onChange={handleFormChange}
      />
      <CustomInput
        label="Description"
        name="description"
        placeholder="Enter Description"
        multiline
        minRows={3}
        value={request.description}
        onChange={handleFormChange}
      />
      <CustomSelect
        value={request.region}
        defaultValue={request.region}
        label="Region"
        name="region"
        placeholder="Region"
      >
        {Regions.map((region) => (
          <MenuItem
            onClick={() =>
              handleFormChange({
                currentTarget: {
                  name: "region",
                  id: "constituency-region",
                },
                target: {
                  value: region,
                  name: "region",
                },
              } as any)
            }
            value={region}
            key={region}
          >
            {region}
          </MenuItem>
        ))}
      </CustomSelect>
      <RowContainer justifyContent="flex-end">
        <PrimaryButton
          disabled={loading}
          loading={loading}
          onClick={handleSubmit}
        >
          Save Changes
        </PrimaryButton>
      </RowContainer>
    </Stack>
  );
}
