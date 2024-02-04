"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/Modal";

const Header = () => {
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
          {/* <Link href={"/"}> */}
          <div className="cursor-pointer" onClick={logoClick}>
            <Image
              src="/images/logo.png"
              alt="텍스트버킷"
              width={131}
              height={28}
            />
          </div>
          {/* </Link> */}
          {isSigned ? (
            <div className="flex items-center gap-x-3">
              {!isCreatePage && (
                <Link
                  href={"/create"}
                  className="py-2 px-4 rounded-lg bg-[#00C37D] text-white text-sm font-semibold"
                >
                  필사하기
                </Link>
              )}
              <div
                className="w-8 h-8 bg-gray-500 overflow-hidden rounded-full cursor-pointer"
                onClick={goToMyPage}
              >
                {profile && profile?.imageUrl && (
                  <img
                    src={profile?.imageUrl}
                    alt="profile"
                    width={32}
                    height={32}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <div
                onClick={goToLoginPage}
                className="py-2 px-4 rounded-lg bg-[#00C37D] text-white text-sm font-semibold cursor-pointer"
              >
                필사하기
              </div>
              <div
                onClick={goToLoginPage}
                className="py-2 px-4 rounded-lg border border-[#00C37D] text-[#00C37D] text-sm font-semibold cursor-pointer"
              >
                로그인
              </div>
            </div>
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
