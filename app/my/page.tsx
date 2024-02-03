"use client";

import PilsaCard from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
import ProtectRoute from "@/shared/hoc/ProtectRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyPage = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const goToEditPage = () => {
    router.push("/my/edit");
  };
  return (
    <ProtectRoute>
      <WithHeaderLayout>
        <main className="mt-4 px-4 flex flex-col gap-y-8">
          <section className="p-4 flex flex-col gap-y-3 items-center justify-center border rounded-xl border-[#EFEFEF]">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={profile?.imageUrl}
                alt="profile"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-1">
              <div className="flex items-center gap-x-1">
                <p className="font-bold text-[#131313] text-xl">
                  {profile?.nickName}
                </p>
                <div className="cursor-pointer" onClick={goToEditPage}>
                  <Image
                    src="/icons/pencil_icon.svg"
                    width={16}
                    height={16}
                    alt="pencil"
                  />
                </div>
              </div>
              <span className="text-[#777] text-xs text-center">
                {profile?.description}
              </span>
            </div>
          </section>
          <section>
            <div className="flex">
              <h3 className="text-lg font-bold">내 필사 아카이브</h3>
              <sup className="text-xs text-[#777]">13</sup>
            </div>
            <div className="mt-3 flex flex-col gap-y-4">
              <PilsaCard />
              <PilsaCard />
            </div>
          </section>
        </main>
      </WithHeaderLayout>
    </ProtectRoute>
  );
};

export default MyPage;
