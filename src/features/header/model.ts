export type Page = {
  id: string;
  label: string;
  link: string;
  protected?: boolean;
};

export const pages: Record<string, Page> = {
  home: {
    id: "home",
    label: "Главная",
    link: "/",
  },
  profile: {
    id: "profile",
    label: "Профиль",
    link: "/profile",
    protected: true,
  },
  frame: {
    id: "frame",
    label: "Виджет",
    link: "/iframe",
    protected: true,
  },
};

export const getPagesList = (isAuthorised: boolean) =>
  Object.values(pages).filter((page) =>
    isAuthorised ? true : !page.protected
  );

export const getPageById = (id: string) => pages[id];
