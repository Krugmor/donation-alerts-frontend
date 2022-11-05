import { Layout } from "antd";
import { SignInButton } from "../../features/auth/by-email/ui/signin-button";
import { SignUpButton } from "../../features/auth/by-email/ui/signup-button";
import styles from "./styles.module.scss";

const HomePage = () => {
  return (
    <Layout.Content className={styles.page}>
      <div>Доступно для всех</div>
      <SignUpButton />
      <SignInButton />
    </Layout.Content>
  );
};

export default HomePage;
