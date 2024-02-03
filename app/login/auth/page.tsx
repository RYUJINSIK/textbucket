"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setProfile, setIsSigned } = useAuth();

  const changeCodeToToken = useCallback(async (code: string) => {
    const res = await axios.post(
      "http://223.130.135.113:8080/api/v1/login",
      {
        socialType: "KAKAO",
        authCode: code,
        isLocal: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const { accessToken } = res.data;
      setIsSigned(true);
      localStorage.setItem("accessToken", accessToken);
      getProfile();
    } else {
      router.push("/404");
    }
  }, []);

  const getProfile = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get("http://223.130.135.113:8080/api/v1/member", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      setProfile(res.data);
      setIsSigned(true);
      localStorage.setItem("proifile", JSON.stringify(res.data));
      router.push("/");
    } else {
      router.push("/404");
    }
  }, []);

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) changeCodeToToken(authCode);
  }, [searchParams]);

  return (
    <div className="spinner">
      <h2>
        잠시만 기다려 주세요!
        <br />
        로그인 중입니다.
      </h2>
    </div>
  );
};
export default AuthPage;
