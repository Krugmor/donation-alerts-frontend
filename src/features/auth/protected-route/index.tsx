import { isAuthorised } from "../../../entities/viewer/model";
import { useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  let navigate = useNavigate();
  const isAuthed = isAuthorised();

  useEffect(() => {
    if (!isAuthed) navigate("/");
  }, [isAuthed, navigate]);

  if (!isAuthed) {
    return null;
  }
  return <>{children}</>;
};
