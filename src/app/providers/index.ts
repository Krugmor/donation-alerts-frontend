import { withRouter } from "./with-router";
import { withStore } from "./with-store";

export const withProviders = (component: () => React.ReactNode) =>
  withRouter(withStore(component));
