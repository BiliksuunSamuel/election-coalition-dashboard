import { Stack, alpha } from "@mui/material";
import { FluidContainer } from "../../views";
import { CustomInput, Paragraph, PrimaryButton, Title } from "../../components";
import resources from "../../resources";

export default function LoginPage() {
  return (
    <FluidContainer
      height="100%"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <Stack
        width="80%"
        height="80%"
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.common.black, 0.065),
          borderRadius: theme.spacing(1),
          overflow: "hidden",
          padding: 0,
          boxShadow: `3px 3px 3px 3px ${alpha(
            theme.palette.common.black,
            0.015
          )}`,
        })}
        direction="row"
      >
        <Stack
          sx={(theme) => ({
            width: "50%",
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
            <CustomInput label="Phone Number" placeholder="Enter phonenumber" />
            <CustomInput
              label="Password"
              placeholder="Enter Password"
              type="password"
            />
            <PrimaryButton>Login</PrimaryButton>
          </Stack>
        </Stack>
        <Stack
          width="40%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Stack>
            <img src={resources.welcomeVector} alt="welcome-vector" />
          </Stack>
          <Title variant="h5">Digital Election Coalition System</Title>
          <Paragraph textAlign="center">
            Record and monitor all your pollings, track and get real time live
            feeds as results are being uploaded.
          </Paragraph>
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
