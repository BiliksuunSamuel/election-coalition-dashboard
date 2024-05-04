import { InputAdornment, Stack, alpha } from "@mui/material";
import { FluidContainer } from "../../views";
import {
  CustomInput,
  CustomOtpInput,
  Paragraph,
  PrimaryButton,
  SizedBox,
  Title,
} from "../../components";
import resources from "../../resources";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerificationPage() {
  const navigation = useNavigate();
  const [code, setCode] = useState("");
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
            <Title variant="h4">Enter Verification Code</Title>
            <Paragraph>
              A verification code has been sent to 233550465223
            </Paragraph>
          </Stack>
          <Stack width="80%" spacing={2}>
            <CustomOtpInput code={code} handleChange={(c) => setCode(c)} />
            <SizedBox height={1} />
            <PrimaryButton
              style={{ width: "80%", alignSelf: "center" }}
              onClick={() => navigation("/dashboard")}
            >
              Login
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    </FluidContainer>
  );
}
