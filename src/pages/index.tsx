import { lazy, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router";
import { ProtectedRoute } from "../features/auth/protected-route";
import { BasicLayout } from "../features/layout";

const HomePage = lazy(() => import("./home"));
const ProfilePage = lazy(() => import("./viewer/profile"));
const IframePage = lazy(() => import("./viewer/iframe"));

const Fallback = ({ children }: PropsWithChildren) => {
  return <Suspense>{children}</Suspense>;
};

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BasicLayout>
            <Fallback>
              <HomePage />
            </Fallback>
          </BasicLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <BasicLayout>
              <Fallback>
                <ProfilePage />
              </Fallback>
            </BasicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/iframe"
        element={
          <ProtectedRoute>
            <Fallback>
              <IframePage />
            </Fallback>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
