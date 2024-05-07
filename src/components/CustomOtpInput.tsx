import OTPInput from "react-otp-input";
import { useTheme } from "@mui/material";

interface IProps {
  code: any;
  handleChange: (value: any) => void;
}
export default function CustomOtpInput({ code, handleChange }: IProps) {
  const theme = useTheme();
  return (
    <OTPInput
      value={code}
      numInputs={4}
      onChange={handleChange}
      renderInput={({ placeholder, ...props }) => (
        <input placeholder="0" {...props} />
      )}
      inputStyle={{
        width: theme.spacing(6),
        height: theme.spacing(5.25),
        margin: `0 ${theme.spacing(0.5)}`,
        fontSize: theme.spacing(3),
      }}
      containerStyle={{ alignSelf: "center", flex: 1 }}
    />
  );
}
