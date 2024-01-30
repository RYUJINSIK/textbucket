"use client";

import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const searchParams = useSearchParams();

  return <div>auth code = {searchParams.toString()}</div>;
};
export default AuthPage;
