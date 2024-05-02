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

  const Logout = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("profile");
      localStorage.removeItem("accessToken");
    }
    setIsSigned(false);
    router.push("/");
  };

  return (
    <WithHeaderLayout>
      <div className="flex justify-between items-center w-[360px] h-14 px-4 py-3 border-t-0 border-r-0 border-b border-l-0 border-[#efefef]">
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
      <div className="flex items-center gap-x-1 cursor-pointer">
        <Image
          src="/icons/logout_icon.svg"
          width={16}
          height={16}
          alt="logout"
        />
        <span className="text-[#999] font-bold">로그아웃</span>
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
    </WithHeaderLayout>
  );
};
export default ProfileSettingPage;
