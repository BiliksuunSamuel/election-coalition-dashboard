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
      <Stack padding={4}>
        <RowContainer justifyContent="space-between">
          <Title variant="h5">Add Election</Title>
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
          <CustomInput
            placeholder="Description"
            label="Description"
            multiline
            name="description"
            onChange={handleForm}
            minRows={3}
            value={request.description}
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
          <SizedBox height={(theme) => theme.spacing(1)} />
          <PrimaryButton
            disabled={loading}
            loading={loading}
            onClick={handleSubmit}
            style={{ height: "45px" }}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
}
