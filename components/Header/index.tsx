"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const Header = () => {
  const { isSigned, profile } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const isCreatePage = pathName.includes("create");

  const goToMyPage = useCallback(() => {
    return void router.push("/my");
  }, [router]);

  return (
    <header className="w-full flex items-center justify-center sticky top-0 bg-white h-14 border-b border-[#efefef] z-50">
      <div className="w-full flex justify-between items-center px-4">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="텍스트버킷"
            width={103}
            height={24}
          />
        </Link>
        {isSigned && profile ? (
          <div className="flex items-center gap-x-3">
            {!isCreatePage && (
              <Link
                href={"/create"}
                className="py-2 px-4 rounded-lg bg-[#385b3b] text-white text-sm font-semibold"
              >
                필사하기
              </Link>
            )}
            <div
              className="w-8 h-8 bg-gray-500 overflow-hidden rounded-full cursor-pointer"
              onClick={goToMyPage}
            >
              <img
                src={profile?.imageUrl}
                alt="profile"
                width={32}
                height={32}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <Link
              href={"/login"}
              className="py-2 px-4 rounded-lg bg-[#385b3b] text-white text-sm font-semibold"
            >
              필사하기
            </Link>
            <Link
              href={"/login"}
              className="py-2 px-4 rounded-lg border border-[#385b3b] text-[#385b3b] text-sm font-semibold"
            >
              로그인
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
