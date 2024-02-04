"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";

export interface IAuthContextState {
  isSigned: boolean;
  profile: IProfile | null;
  setProfile: Dispatch<SetStateAction<IProfile | null>>;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
}

export interface IProfile {
  id: number;
  nickName: string;
  imageUrl: string;
  description: string;
  status: string;
}

const AuthContext = createContext<IAuthContextState>({
  isSigned: false,
  profile: null,
  setProfile: () => undefined,
  setIsSigned: () => undefined,
});

const AuthProvider = ({ children }: any) => {
  // 로컬 스토리지 값 사용
  const localStorageProfile =
    typeof window !== "undefined" ? localStorage.getItem("profile") : null;
  const localStorageToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // 로컬 스토리지 값을 (새로고침 시)초깃값으로 사용
  const [profile, setProfile] = useState<IProfile | null>(
    JSON.parse(localStorageProfile as string)
  );
  const [isSigned, setIsSigned] = useState(localStorageToken ? true : false);

  useEffect(() => {
    const rawProfile = localStorage.getItem("profile");
    const accessToken = localStorage.getItem("accessToken");

    if (rawProfile && accessToken) {
      const profile = JSON.parse(rawProfile);
      setProfile(profile);
      setIsSigned(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSigned, profile, setProfile, setIsSigned }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
