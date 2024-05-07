import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { FluidContainer, ResponseModal, RowContainer } from "../../views";
import {
  CustomOtpInput,
  InkButton,
  Paragraph,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import resources from "../../resources";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useAuth from "../../hooks/useAuth";
import { clearResponse } from "../../features/ResponseReducer";

export default function VerificationPage() {
  const dispatch = useAppDispatch();
  const { prefix } = useAppSelector((state) => state.AuthReducer);
  const {
    handleResendCode,
    handleVerifyCode,
    verificationCode,
    setVerificationCode,
  } = useAuth();
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { loading, error } = useAppSelector((state) => state.ResponseReducer);
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  return (
    <FluidContainer
      alignItems="center"
      justifyContent="center"
      width={undefined}
      padding={isMobile ? 2 : 4}
    >
      <ResponseModal
        variant="error"
        open={Boolean(error)}
        message={error}
        title="Error"
        handleDone={() => dispatch(clearResponse())}
      />

      <Stack width={isMobile ? "100%" : "50%"}>
        <Stack
          sx={() => ({
            height: "100%",
          })}
        >
          <Stack
            marginBottom={4}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            width="100%"
            alignSelf="center"
          >
            <Stack marginY={2}>
              <img src={resources.logo} alt="app-logo" />
            </Stack>
            <Title textAlign="center" variant="h4">
              Enter Verification Code
            </Title>
            <Paragraph textAlign="center">
              A verification code has been sent to {user?.phoneNumber}
            </Paragraph>
          </Stack>
          <Stack
            alignSelf="center"
            alignItems="center"
            width="100%"
            spacing={2}
          >
            <RowContainer>
              <Title fontSize={(theme) => theme.spacing(2)}>{prefix}</Title>
              <span style={{ fontSize: "22px" }}>-</span>
              <CustomOtpInput
                code={verificationCode}
                handleChange={(c) => setVerificationCode(c)}
              />
            </RowContainer>
            <SizedBox height={1} />
            <PrimaryButton
              style={{ width: isMobile ? "80%" : "60%", alignSelf: "center" }}
              onClick={handleVerifyCode}
              loading={loading}
              disabled={loading}
            >
              Login
            </PrimaryButton>
            <RowContainer>
              <Paragraph>Didn't receive code?</Paragraph>
              <InkButton disabled={loading} onClick={handleResendCode}>
                Resend
              </InkButton>
            </RowContainer>
          </Stack>
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
