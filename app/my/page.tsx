"use client";

import PilsaCard from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
import ProtectRoute from "@/shared/hoc/ProtectRoute";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IPilsaList } from "../page";
import Link from "next/link";

const MyPage = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [myPilsaList, setMyPilsaList] = useState<IPilsaList | undefined>(
    undefined
  );
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const fetchMyPilsaList = async () => {
    const res = await axios.get<IPilsaList>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa?page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      setMyPilsaList(res.data);
      return res.data;
    }
  };
  const goToEditPage = () => {
    router.push("/my/edit");
  };

  useEffect(() => {
    fetchMyPilsaList();
  }, []);

  console.log(myPilsaList);

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
              {myPilsaList && (
                <sup className="text-xs text-[#777]">
                  {myPilsaList.totalCount}
                </sup>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-y-4">
              {myPilsaList ? (
                myPilsaList.pilsaLists.map((pilsaInfo) => (
                  <PilsaCard pilsaInfo={pilsaInfo} key={pilsaInfo.pilsaId} />
                ))
              ) : (
                <div className="py-16 px-6 flex flex-col gap-y-8 items-center justify-center rounded-xl bg-[#fff1f1]">
                  <p className="text-center font-semibold text-lg text-[#353535]">
                    ✍️
                    <br />
                    담아두고 싶은 문장을
                    <br />
                    지금 바로 필사해 보세요!
                  </p>
                  <Link
                    href={"/create"}
                    className="w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-lg font-bold"
                  >
                    필사하기
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
      </WithHeaderLayout>
    </ProtectRoute>
  );
};

export default MyPage;
