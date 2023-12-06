import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import { logout } from "../firebaseConfig/firebase.js";

export function SignOut() {
  useEffect(() => {}, []);
  const navigate = useNavigate();

  return (
    <AuthProvider
      onUserLoggedIn={async () => {
        await logout();
        navigate("/");
      }}
      onUserNotRegistered={async () => {
        await logout();
        navigate("/");
      }}
      onUserNotLoggedIn={() => {
        navigate("/");
      }}
    ></AuthProvider>
  );
}