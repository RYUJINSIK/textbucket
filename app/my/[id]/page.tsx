"use client";

import Modal from "@/components/Modal";
import { IPilsaCardItem } from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import LikeNShare from "@/components/LikeNShare";
import { useAuth } from "@/shared/contexts/AuthContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const MyPilsaDetailPage = () => {
  const params = useParams();
  const pilsaId = params.id;
  const { profile } = useAuth();
  const router = useRouter();
  const [pilsaInfo, setPilsaInfo] = useState<IPilsaCardItem | undefined>(
    undefined
  );
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const isMine = profile?.id === pilsaInfo?.memberInfoResponse.id;
  const fetchPilsaItem = async (pilsaId: string) => {
    const res = await axios.get<IPilsaCardItem>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/${pilsaId}?getMyPilsa=${isMine}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      setPilsaInfo(res.data);
      return res.data;
    }
  };

  const deletePilsaItem = async () => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/${pilsaId}`,
      {
        data: {
          memberId: profile?.id as number,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      setIsOpen(false);
      router.back();
    }
  };

  useEffect(() => {
    fetchPilsaItem(pilsaId as string);
  }, []);

  const onClickToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  const detailDate = (time: Date) => {
    const milliSeconds = new Date().getTime() - time.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <WithHeaderLayout>
      {pilsaInfo && (
        <>
          <main
            className="pt-6 flex flex-col gap-y-5 pb-12 px-4 h-full relative"
            style={{
              minHeight: "calc(100vh - 101px)",
            }}
          >
            {pilsaInfo.backgroundImageUrl && (
              <div className="absolute top-0 left-0 w-full h-full z-0 bg-white/40">
                <img
                  src={`${pilsaInfo.backgroundImageUrl}.png`}
                  alt="pilsaImg"
                  className="h-full w-full"
                />
              </div>
            )}
            {pilsaInfo.backgroundColor && (
              <div
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{ backgroundColor: pilsaInfo.backgroundColor }}
              ></div>
            )}
            <section className="py-1 flex items-center gap-x-2 relative z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                <Link href={"/my"}>
                  <img
                    src={pilsaInfo.memberInfoResponse.imageUrl}
                    alt="profile"
                    className="w-full h-full"
                  />
                </Link>
              </div>
              <div className="flex flex-col">
                <p className="text-[#131313] font-bold">
                  {pilsaInfo.memberInfoResponse.nickName}
                </p>
                <span className="text-xs text-[#666]">
                  {detailDate(new Date(pilsaInfo.registDate))}
                </span>
              </div>
            </section>
            <section className="">
              <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium relative z-10">
                {pilsaInfo.categoryLists &&
                  pilsaInfo.categoryLists.map((cate) => (
                    <>
                      <span>{cate.categoryName}</span>
                      <span className="last:hidden">∙</span>
                    </>
                  ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg text-[#353535] font-bold font-Bokk-MeongJo relative z-10">
                  {pilsaInfo.title}
                </p>

                <div
                  className="relative cursor-pointer"
                  onClick={onClickToggle}
                >
                  <Image
                    src="/icons/more_vertical_icon.svg"
                    alt="more"
                    width={24}
                    height={24}
                  />
                  {toggle && (
                    <div className="absolute -bottom-[50px] right-0 bg-white rounded-lg w-[114px] shadow-md z-50">
                      <Link
                        href={`/update/${pilsaId}`}
                        className="flex items-center gap-x-2 py-4 px-5 border-b border-[#dedede]"
                      >
                        <img src="/icons/pencil_icon.svg" />
                        <span className="text-sm">수정하기</span>
                      </Link>
                      <div
                        onClick={() => {
                          setToggle(false);
                          setIsOpen(true);
                        }}
                        className="flex items-center gap-x-2 py-4 px-5 relative z-50"
                      >
                        <img
                          src="/icons/trashcan_icon.png"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm">삭제하기</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className="">
              {pilsaInfo.pilsaImages[0].imageUrl && (
                <div className="left-0 w-full h-400 relative z-10 bg-white/40">
                  <img
                    src={pilsaInfo.pilsaImages[0].imageUrl}
                    alt="pilsaImg"
                    width={400}
                    height={400}
                  />
                </div>
              )}
              <p className="text-[#353535] font-light font-Bokk-MeongJo relative whitespace-pre-wrap z-10">
                {pilsaInfo.textContents}
              </p>
            </section>
            <div className="flex text-[#666] text-xs font-light z-10">
              <p>{pilsaInfo.author}</p>|<p>{pilsaInfo.publisher}</p>
            </div>
          </main>
          <footer className="bg-white border-t border-[EFEFEF] py-3 px-5 w-full flex items-start justify-between sticky bottom-11 left-0">
            {pilsaInfo.isPreviousPilsa && (
              <Link
                className="flex items-center gap-x-1"
                href={`/pilsa/${pilsaInfo.previousPilsa.pilsaId}`}
              >
                <div className="flex items-center gap-x-1">
                  <Image
                    src="/icons/arrow_left_icon.svg"
                    alt="left"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm text-[#999]">이전</span>
                </div>
                <p className="text-[#777] text-sm">
                  {pilsaInfo.previousPilsa.title}
                </p>
              </Link>
            )}
            {pilsaInfo.isNextPilsa && (
              <Link
                className="flex items-center gap-x-1 self-end ml-auto"
                href={`/pilsa/${pilsaInfo.nextPilsa.pilsaId}`}
              >
                <div className="flex items-center gap-x-1">
                  <p className="text-[#777] text-sm">
                    {pilsaInfo.nextPilsa.title}
                  </p>
                  <span className="text-sm text-[#999]">다음</span>
                  <Image
                    src="/icons/arrow_right_icon.svg"
                    alt="left"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            )}
          </footer>
          <LikeNShare
            title={pilsaInfo.title}
            description={pilsaInfo.textContents}
            liked={pilsaInfo.isLikedAble}
            pilsaId={pilsaId as string}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="정말 삭제하시겠어요?"
            content="다시 복구되지 않아요."
            confirmButton="삭제하기"
            closeButton="아니요"
            confirmEvent={deletePilsaItem}
          />
        </>
      )}
    </WithHeaderLayout>
  );
};
export default MyPilsaDetailPage;
