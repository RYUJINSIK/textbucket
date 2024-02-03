"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
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
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    const rawProfile = localStorage.getItem("profile");
    const accessToken = localStorage.getItem("accessToken");

    if (rawProfile && accessToken) {
      const profile = JSON.parse(rawProfile);
      setProfile(profile);
      setIsSigned(true);
    }
  }, [profile, isSigned]);

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
