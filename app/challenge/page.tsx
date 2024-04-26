"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Link from "next/link";
import WithHeaderLayout from "@/components/WithHeaderLayout";

export interface IChallengeItem {
  id: number;
  startDate: string;
  endDate: string;
  achievementRate: number;
  title: string;
  description: string;
}
interface ICategoryItem {
  categoryCd: number;
  categoryName: string;
  description: string;
}
const ChallengePage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState(["ING"]);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [exist, setExist] = useState(false);
  const [challenge, setChallenge] = useState<IChallengeItem | undefined>(
    undefined
  );
  const [categoryList, setCategoryList] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/challenge/list?page=${page}&size=${pageSize}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.totalCount >= 1) {
          setExist(true);
          getChallengeDetail(res.data.challengeInfos[0].id);
        }
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  const getChallengeDetail = (challengeId: number) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/challenge/${challengeId}?challengeId=${challengeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("??");
        // console.log(res.data.categoryListDto.categories);
        setChallenge(res.data);
        setCategoryList(res.data.categoryListDto.categories);
      })
      .catch((error) => {
        console.log("!", error);
      });
  };

  function dateDifference(date1: any, date2: any) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const diffInMilliseconds = Math.abs(
      endDate.getTime() - startDate.getTime()
    );
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.ceil(diffInMilliseconds / millisecondsInADay) + 1;

    return diffInDays;
  }
  return (
    <WithHeaderLayout>
      {exist ? (
        challenge && (
          <>
            <p>title : {challenge.title}</p>
            <p>startDate : {challenge.startDate}</p>
            <p>endDate : {challenge.endDate}</p>
            <p>description : {challenge.description}</p>
            <p>achievementRate : {challenge.achievementRate}</p>
            <p>
              category :
              {categoryList &&
                categoryList.map((cate: any) => (
                  <>
                    <span>{cate.categoryName}</span>
                    <span className="last:hidden">∙</span>
                  </>
                ))}
            </p>
            <div className="w-[360px] h-[900px] relative overflow-hidden bg-[#bfd8f2]">
              <div className="flex items-center absolute left-4 top-[150px] gap-4 py-2">
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bold text-black">
                    {challenge.title}
                  </p>
                  <div className="flex gap-2.5 bg-[#00945f] px-[7px] py-[5px] rounded-full">
                    <p className="text-xs font-semibold text-white">
                      {dateDifference(challenge.startDate, challenge.endDate)}
                      일간
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start w-[328px] absolute left-4 top-[195px] gap-1 p-3 rounded-xl bg-[#e9fff7]/30">
                <div className="flex items-center gap-2">
                  <p className="w-[50px] text-xs font-medium text-[#555]">
                    기간
                  </p>
                  <p className="text-xs text-[#353535]">
                    {challenge.startDate} ~ {challenge.endDate}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <p className="w-[50px] text-xs font-medium text-[#555]">
                    다짐
                  </p>
                  <p className="text-xs text-[#353535]">
                    {challenge.description}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <p className="w-[50px] text-xs font-medium text-[#555]">
                    카테고리
                  </p>
                  <div className="flex gap-0.5">
                    {categoryList &&
                      categoryList.map((cate: any) => (
                        <>
                          <p className="text-xs text-[#353535]">
                            {cate.categoryName}
                          </p>

                          <p className="text-xs text-[#353535] last:hidden">
                            ∙
                          </p>
                        </>
                      ))}
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-[295px] w-[360px] h-[493px] rounded-tl-3xl rounded-tr-3xl bg-white">
                <div className="w-[328px] h-1 absolute left-[15px] top-[95px] bg-[#c4c4c4]" />
                <div className="w-[94px] h-1 absolute left-[15px] top-[95px] bg-[#fd53a1]" />

                <div className="flex flex-col gap-3 absolute left-4 top-6">
                  <div className="flex justify-between items-center w-[328px] h-[37px] py-2">
                    <p className="text-base font-bold text-[#353535]">
                      챌린지 달성도
                    </p>
                    <p className="text-sm font-bold text-[#fd53a1]">
                      현재 {challenge.achievementRate}% 달성
                    </p>
                  </div>
                  {/* stamp 컴포넌트 생성해서 단계 표시  */}
                </div>

                <div className="flex flex-col justify-start items-start w-[328px] absolute left-4 top-[146px] gap-2 px-4 py-5 rounded-xl bg-[#ffbddc]">
                  <p className="text-[15px] font-bold text-[#353535]">
                    1장 가장 인상깊은 구절
                  </p>
                  <p className="text-[15px] font-light text-[#353535]">
                    Ich bitte die Kinder um Verzeihung, daß ich dieses Buch
                    einem Erwachsenen widme.
                  </p>
                  <div className="flex justify-center items-center self-stretch relative py-1">
                    <p className="text-xs font-medium text-[#777]">더보기</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.64645 3.64645C5.84171 3.45118 6.15829 3.45118 6.35355 3.64645L10.3536 7.64645C10.5488 7.84171 10.5488 8.15829 10.3536 8.35355L6.35355 12.3536C6.15829 12.5488 5.84171 12.5488 5.64645 12.3536C5.45118 12.1583 5.45118 11.8417 5.64645 11.6464L9.29289 8L5.64645 4.35355C5.45118 4.15829 5.45118 3.84171 5.64645 3.64645Z"
                        fill="#777777"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-center items-center w-[328px] absolute left-4 top-[719px] gap-1 px-6 py-4 rounded-xl bg-[#00c37d]">
                  <p className="text-base font-bold text-white">
                    오늘의 챌린지 실천하기
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="h-screen flex justify-center items-center bg-[#E6FFF6] m-3 rounded-xl">
          <div className="flex flex-col gap-y-4 w-full max-w-[500px] items-center justify-center">
            <div className="flex flex-col gap-y-8 items-center justify-center">
              <p className="text-center font-semibold text-lg text-[#353535]">
                📅
                <br />
                챌린지 기간을 설정하고
                <br />
                기간동안 필사를 진행해 보세요 :)
              </p>
              <Link
                href={"/challenge/create"}
                className="w-full py-4 rounded-lg text-white text-center bg-[#00C37D] text-lg font-bold"
              >
                + 챌린지 만들기
              </Link>
            </div>
          </div>
        </div>
      )}
    </WithHeaderLayout>
  );
};
export default ChallengePage;
