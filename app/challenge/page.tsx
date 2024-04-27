"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Link from "next/link";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
            <div className="w-full h-[900px] overflow-hidden bg-[#bfd8f2]">
              <div className="flex items-center mt-8">
                <div className="flex items-center gap-1 pl-5">
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
              <div className="flex flex-col items-center mt-2">
                <div className="flex flex-col items-start w-[350px] left-4 gap-1 p-3 rounded-xl bg-[#e9fff7]/30">
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
                    <p className="text-xs text-[#353535] whitespace-pre-wrap">
                      {challenge.description}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <p className="w-[50px] text-xs font-medium text-[#555]">
                      카테고리
                    </p>
                    <div className="flex gap-0.5 text-xs text-[#353535]">
                      {categoryList &&
                        categoryList.map((cate: any) => (
                          <>
                            <p>{cate.categoryName}</p>
                            <p className="last:hidden">∙</p>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="left-0 w-full h-full rounded-tl-3xl rounded-tr-3xl bg-white mt-5 p-4">
                <div className="flex flex-col items-center pt-3">
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
                <button
                  type="button"
                  onClick={() => {
                    router.push("/create");
                  }}
                  className={`mt-5 mb-5 py-4 flex w-full items-center justify-center rounded-lg text-white text-center bg-[#00C37D] text-base font-bold`}
                >
                  오늘의 챌린지 실천하기
                </button>
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
