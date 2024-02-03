import { useAuth } from "../contexts/AuthContext";

const ProtectRoute = ({ children }: any) => {
  const { isSigned } = useAuth();
  if (!isSigned && typeof window !== "undefined") {
    window.location.replace("/login");
  }
  return <>{children}</>;
};

export default ProtectRoute;
