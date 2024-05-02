"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/Modal";

type HeaderProps = {
  iconType: string;
};

const Header = ({ iconType }: HeaderProps) => {
  const { isSigned, profile } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const isCreatePage = pathName.includes("create");
  const [confirmModal, setConfirmModalModal] = useState(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const goToMyPage = useCallback(() => {
    return void router.push("/my");
  }, [router]);

  const logoClick = () => {
    isCreatePage ? setConfirmModalModal(true) : router.push("/");
  };
  const goToLoginPage = useCallback(() => {
    return void router.push("/login");
  }, [router]);

  const handleIconClick = (type: string) => {
    switch (type) {
      case "setting":
        router.push("/");
        break;
      case "archive":
        break;
      case "write":
        break;
      case "archive":
        break;
      case "my":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  const goToMain = () => {
    void router.push("/");
  };

  return (
    mounted && (
      <header className="w-full flex items-center justify-center sticky top-0 bg-white h-14 border-b border-[#efefef] z-50">
        <div className="w-full flex justify-between items-center px-4">
          <div className="cursor-pointer" onClick={logoClick}>
            <Image
              src="/images/logo.png"
              alt="텍스트버킷"
              width={131}
              height={28}
            />
          </div>
          {iconType !== "" ? (
            <div className="flex items-center gap-x-3">
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick(iconType)}
              >
                <img
                  src={`/icons/${iconType}.png`}
                  alt="profile"
                  width={25}
                  height={25}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {confirmModal && (
          <Modal
            open={confirmModal}
            onClose={() => setConfirmModalModal(!confirmModal)}
            confirmEvent={goToMain}
            title="작성을 취소하고 나가시겠어요?"
            content="작성한 글은 저장되지 않아요."
            closeButton="머무르기"
            confirmButton="나가기"
          />
        )}
      </header>
    )
  );
};

export default Header;
