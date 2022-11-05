import { Button } from "antd";
import { signUp } from "../../../../../shared/api/auth";

export const SignUpButton = () => {
  const onClick = () => {
    signUp({ email: "123@gmail.com", password: "12345678" });
  };

  return <Button onClick={onClick}>Регистрация</Button>;
};
