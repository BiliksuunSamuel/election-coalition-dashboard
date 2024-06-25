import { InputAdornment, Stack, useMediaQuery, useTheme } from "@mui/material";
import { FluidContainer, ResponseModal } from "../../views";
import {
  CustomInput,
  Paragraph,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import resources from "../../resources";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useAuth from "../../hooks/useAuth";
import { clearResponse } from "../../features/ResponseReducer";

export default function LoginPage() {
  const { loginRequest, handleLoginForm, handleLogin } = useAuth();
  const { error, loading } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  return (
    <FluidContainer
      alignItems="center"
      justifyContent="center"
      width={undefined}
      padding={4}
    >
      <Stack width={isMobile ? "100%" : "50%"}>
        <ResponseModal
          variant="error"
          message={error}
          open={Boolean(error)}
          handleDone={() => dispatch(clearResponse())}
        />
        <Stack
          sx={(theme) => ({
            height: "100%",
            bgcolor: theme.palette.common.white,
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing(isMobile ? 1 : 4),
            borderRadius: theme.spacing(2),
          })}
          className="glassmorphism"
        >
          <Stack
            marginBottom={4}
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Stack marginY={2}>
              <img src={resources.logo} alt="app-logo" />
            </Stack>
            <Title variant="h4">Welcome back</Title>
            <Paragraph textAlign="center">
              Glad to see you again, Login to your account below
            </Paragraph>
          </Stack>
          <Stack width={isMobile ? undefined : "70%"} spacing={2}>
            <CustomInput
              startAdornment={
                <InputAdornment position="start">+233</InputAdornment>
              }
              label="Phone Number"
              placeholder="Enter phonenumber"
              value={loginRequest.username}
              onChange={handleLoginForm}
              style={{ height: "45px", fontSize: theme.spacing(2.25) }}
              name="username"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />

            {isMobile && <SizedBox height={(theme) => theme.spacing(2)} />}

            <PrimaryButton
              loading={loading}
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
