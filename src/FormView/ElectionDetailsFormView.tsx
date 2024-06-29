import { MenuItem, Stack, Typography } from "@mui/material";
import {
  CustomCloseButton,
  CustomDatePicker,
  CustomDialog,
  CustomInput,
  CustomSelect,
  PrimaryButton,
} from "../components";
import { IModalProps } from "../interfaces";
import {
  ICategoryDisplayDto,
  ICreateElectionRequest,
} from "../models/ElectionModel";
import { RowContainer } from "../views";
import dayjs from "dayjs";

interface IProps extends IModalProps {
  handleClose?: () => void;
  handleSubmit: () => void;
  request: ICreateElectionRequest;
  handleElectionDetailsForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  categories: ICategoryDisplayDto[];
}
export default function ElectionDetailsFormView({
  loading,
  handleElectionDetailsForm,
  request,
  handleClose,
  handleSubmit,
  categories,
  ...others
}: IProps) {
  return (
    <CustomDialog showCloseIcon={false} fullWidth maxWidth="sm" {...others}>
      <Stack spacing={2}>
        <RowContainer justifyContent="space-between">
          <Typography fontWeight="bold">Election Details</Typography>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <Stack spacing={2}>
          <CustomInput
            name="title"
            value={request.title}
            label="Title"
            onChange={handleElectionDetailsForm}
            placeholder="Election Title"
          />
          <CustomSelect
            name="category"
            value={request.category}
            label="Category"
            onChange={(e) =>
              handleElectionDetailsForm({
                currentTarget: {
                  name: "category",
                  id: "election_category",
                },
                target: e.target,
              } as any)
            }
          >
            {categories.map((c) => (
              <MenuItem value={c.title} key={c.id}>
                {c.title}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomInput
            label="Description"
            placeholder="Election Description"
            name="description"
            multiline
            minRows={3}
            value={request.description}
            onChange={handleElectionDetailsForm}
          />
          <RowContainer>
            <Stack flex={1}>
              <CustomDatePicker
                onChange={(val) =>
                  handleElectionDetailsForm({
                    currentTarget: {
                      name: "startDate",
                      id: "start-date",
                    },
                    target: {
                      value: dayjs(val).format(),
                    },
                  } as any)
                }
                value={dayjs(request.startDate)}
              />
            </Stack>
            <Stack>
              <CustomDatePicker
                onChange={(val) =>
                  handleElectionDetailsForm({
                    currentTarget: {
                      name: "endDate",
                      id: "end-date",
                    },
                    target: {
                      value: dayjs(val).format(),
                    },
                  } as any)
                }
                value={dayjs(request.endDate)}
              />
            </Stack>
          </RowContainer>
          <RowContainer justifyContent="flex-end">
            <PrimaryButton
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              Save Changes
            </PrimaryButton>
          </RowContainer>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
