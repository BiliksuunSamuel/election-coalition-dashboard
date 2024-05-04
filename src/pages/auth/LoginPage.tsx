import { InputAdornment, Stack, alpha, useTheme } from "@mui/material";
import { FluidContainer, ResponseModal } from "../../views";
import { CustomInput, Paragraph, PrimaryButton, Title } from "../../components";
import resources from "../../resources";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useAuth from "../../hooks/useAuth";
import { clearResponse } from "../../features/ResponseReducer";

export default function LoginPage() {
  const { loginRequest, handleLoginForm, handleLogin } = useAuth();
  const { error, loading } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  return (
    <FluidContainer alignItems="center" justifyContent="center" padding={4}>
      <Stack
        width="50%"
        height="80%"
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.common.black, 0.065),
          borderRadius: theme.spacing(1),
          overflow: "hidden",
          padding: 0,
        })}
      >
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
            padding: theme.spacing(4),
          })}
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
            <Paragraph>
              Glad to see you again, Login to your account below
            </Paragraph>
          </Stack>
          <Stack width="80%" spacing={2}>
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
            />

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
