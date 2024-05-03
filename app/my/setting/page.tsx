"use client";

import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { profile, setProfile, setIsSigned } = useAuth();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Logout = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/logout`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("profile");
        localStorage.removeItem("accessToken");
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    mounted && (
      <WithHeaderLayout>
        <div
          className="flex flex-col h-full justify-between px-4"
          style={{ minHeight: "calc(100vh - 72px)" }}
        >
          <div className="flex justify-between items-center w-[360px] h-14 py-3 border-t-0 border-r-0 border-b border-l-0 border-[#efefef]">
            <div className="flex justify-start items-center flex-grow relative gap-1">
              <Image
                width={24}
                height={24}
                alt="back"
                src="/icons/ibtn_back.png"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
                onClick={() => router.back()}
              />
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                설정
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-[360px] relativerounded-lg">
            <div
              className="flex justify-center items-center flex-grow relative gap-1 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b5b5b5]">
                로그아웃
              </p>
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#b5b5b5]">
              |
            </p>
            <div className="flex justify-center items-center flex-grow relative gap-1 cursor-pointer">
              <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#b5b5b5]">
                탈퇴하기
              </p>
            </div>
          </div>

          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            confirmEvent={Logout}
            title="정말 로그아웃할까요?"
            content="가지 마세요..."
            confirmButton="로그아웃하기"
            closeButton="닫기"
          />
        </div>
      </WithHeaderLayout>
    )
  );
};
export default ProfileSettingPage;
