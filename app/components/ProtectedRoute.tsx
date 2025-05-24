import { useContext, useEffect, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/auth/login");
    }
  }, [loading, token, router]);

  if (loading || !token) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
