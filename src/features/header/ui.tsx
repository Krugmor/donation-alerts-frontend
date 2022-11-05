import { Layout, Menu } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { viewerModel } from "../../entities/viewer";
import { getPageById, getPagesList } from "./model";

export const Header = () => {
  const navigation = useNavigate();
  const isAuthed = viewerModel.isAuthorised();

  const pagesList = useMemo(() => getPagesList(isAuthed), [isAuthed]);

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={pagesList.map((page) => ({ key: page.id, label: page.label }))}
        onClick={({ key }) => navigation(getPageById(key).link)}
      />
    </Layout.Header>
  );
};
