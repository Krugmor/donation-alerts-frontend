import { Button } from "antd";
import { useDispatch } from "react-redux";
import { viewerModel } from "../../../../../entities/viewer";
import { signIn } from "../../../../../shared/api/auth";

export const SignInButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    signIn({ email: "123@gmail.com", password: "12345678" }).then((res) => {
      dispatch(viewerModel.setToken(res.data.token));
    });
  };

  return <Button onClick={onClick}>Вход</Button>;
};
