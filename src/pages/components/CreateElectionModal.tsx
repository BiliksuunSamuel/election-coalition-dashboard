import { ModalProps, Stack } from "@mui/material";
import {
  CustomCloseButton,
  CustomDatePicker,
  CustomDialog,
  CustomInput,
  CustomSelect,
  MenuItemView,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import { RowContainer } from "../../views";
import {
  ICategoryDisplayDto,
  ICreateElectionRequest,
} from "../../models/ElectionModel";
import { ChangeEvent } from "react";
import dayjs from "dayjs";

interface IProps extends ModalProps {
  categories: ICategoryDisplayDto[];
  handleForm: (e: ChangeEvent<HTMLInputElement>) => void;
  request: ICreateElectionRequest;
  handleClose?: () => void;
  handleSubmit?: () => void;
  loading: boolean;
}
export default function CreateElectionModal({
  categories,
  handleForm,
  handleClose,
  request,
  handleSubmit,
  loading,
  ...others
}: IProps) {
  return (
    <CustomDialog maxWidth="sm" fullWidth {...others} showCloseIcon={false}>
      <Stack padding={1}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Election Details</Title>
          <CustomCloseButton onClick={handleClose} />
        </RowContainer>
        <SizedBox height={(theme) => theme.spacing(2)} />
        <Stack spacing={1.85}>
          <CustomInput
            name="title"
            onChange={handleForm}
            placeholder="Enter Election Title"
            label="Title"
            value={request.title}
          />
          <CustomSelect value={request.category} label="Category">
            {categories.map((c) => (
              <MenuItemView
                onClick={() =>
                  handleForm({
                    currentTarget: {
                      name: "category",
                      id: "category_input",
                    },
                    target: {
                      value: c.title,
                    },
                  } as any)
                }
                key={c.id}
                value={c.title}
              >
                {c.title}
              </MenuItemView>
            ))}
          </CustomSelect>
          <CustomInput
            placeholder="Description"
            label="Description"
            multiline
            name="description"
            onChange={handleForm}
            minRows={3}
            value={request.description}
          />

          <RowContainer>
            <Stack flex={1}>
              <CustomDatePicker
                onChange={(val) =>
                  handleForm({
                    currentTarget: {
                      name: "startDate",
                      id: "start_date_input",
                    },
                    target: {
                      value: dayjs(val).format(),
                    },
                  } as any)
                }
                label="Start Date"
                value={dayjs(request.startDate)}
              />
            </Stack>
            <Stack flex={1}>
              <CustomDatePicker
                onChange={(val) =>
                  handleForm({
                    currentTarget: {
                      name: "endDate",
                      id: "end_date_input",
                    },
                    target: {
                      value: dayjs(val).format(),
                    },
                  } as any)
                }
                label="End Date"
                value={dayjs(request.endDate)}
              />
            </Stack>
          </RowContainer>
          <SizedBox height={(theme) => theme.spacing(1)} />
          <PrimaryButton
            disabled={loading}
            loading={loading}
            onClick={handleSubmit}
            style={{ height: "45px" }}
          >
            Save Changes
          </PrimaryButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
