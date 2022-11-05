import { PropsWithChildren } from "react";
import { Header } from "../header";
import { Layout } from "antd";

export const BasicLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  );
};
