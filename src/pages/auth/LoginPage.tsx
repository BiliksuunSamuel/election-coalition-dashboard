import { InputAdornment, Stack, alpha } from "@mui/material";
import { FluidContainer } from "../../views";
import { CustomInput, Paragraph, PrimaryButton, Title } from "../../components";
import resources from "../../resources";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigation = useNavigate();
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
              style={{ height: "45px" }}
            />

            <PrimaryButton onClick={() => navigation("/verify-otp")}>
              Login
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
