"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, Suspense } from "react";

const AuthPage = () => {
  return (
    <Suspense>
      <GetProfile />
    </Suspense>
  );
};
const GetProfile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authCode = searchParams.get("code");

  const { setProfile, setIsSigned } = useAuth();

  const changeCodeToToken = useCallback(async (code: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/login`,
      {
        socialType: "KAKAO",
        authCode: code,
        isLocal: true,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const { accessToken, refreshToken, refreshTokenExpirationTime } =
        res.data;
      setIsSigned(true);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "refreshTokenExpirationTime",
        refreshTokenExpirationTime
      );
      document.cookie = `refresh-token=${refreshToken}`;
      getProfile();
    } else {
      router.push("/404");
    }
  }, []);

  const getProfile = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      setProfile(res.data);
      setIsSigned(true);
      localStorage.setItem("profile", JSON.stringify(res.data));
      router.push("/");
    } else {
      router.push("/404");
    }
  }, []);

  useEffect(() => {
    if (authCode) changeCodeToToken(authCode);
  }, [authCode]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#dffff3]">
      <div className="w-full bg-white h-full max-w-[390px] shadow-xl flex items-center justify-center">
        <img src="/images/loading.gif" alt="loading" />
      </div>
    </div>
  );
};

export default AuthPage;
