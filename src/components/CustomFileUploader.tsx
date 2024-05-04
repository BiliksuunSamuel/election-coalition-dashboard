import {
  CircularProgress,
  Stack,
  StackProps,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import Title from "./Title";
import { ChangeEvent } from "react";
import { InkButton, PrimaryButton } from ".";
import { FaPaperclip } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RowContainer } from "../views";

interface IProps extends StackProps {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  handleFileUpload?: () => void;
  file: any;
  placeholder?: string;
  inputId?: string;
  showPreviewButton?: boolean;
  handlePreview?: () => void;
  showRemoveButton?: boolean;
  handleRemove?: () => void;
}
export default function CustomFileUploader({
  handleChange,
  file,
  handleFileUpload,
  loading,
  placeholder = "Upload ID Image",
  inputId = "id-file-input",
  showPreviewButton,
  handlePreview,
  showRemoveButton,
  handleRemove,
  ...others
}: IProps) {
  const theme = useTheme();
  return (
    <Stack spacing={1} {...others}>
      <Title
        variant="body2"
        color={alpha(theme.palette.common.black, 0.65)}
        fontWeight="500"
        textAlign="left"
      >
        {placeholder}
      </Title>
      <input
        style={{ display: "none" }}
        type="file"
        id={inputId}
        onChange={handleChange}
      />
      <RowContainer justifyContent="flex-start">
        <Typography
          variant="body2"
          color={alpha(theme.palette.common.black, 0.5)}
          component="label"
          htmlFor={inputId}
          style={{ cursor: "pointer" }}
        >
          <RowContainer>
            <FaPaperclip color={theme.palette.primary.main} />
            <p>{`${file ? file?.name : "Name of Required File"}`}</p>
          </RowContainer>
        </Typography>
        {showPreviewButton && (
          <InkButton
            onClick={handlePreview}
            style={{ color: theme.palette.primary.main }}
          >
            View
          </InkButton>
        )}
        {showRemoveButton && (
          <InkButton onClick={handleRemove}>
            <RiDeleteBin6Line />
          </InkButton>
        )}
        <PrimaryButton
          disabled={loading || !file}
          onClick={handleFileUpload}
          variant="text"
        >
          {loading && (
            <Stack width="15px" height="15px">
              <CircularProgress size="xs" />
            </Stack>
          )}
          Upload
        </PrimaryButton>
      </RowContainer>
    </Stack>
  );
}
