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
        console.log(res.data);
        setChallenge(res.data);
        setCategoryList(res.data.categoryListDto);
      })
      .catch((error) => {
        console.log("!", error);
      });
  };
  return (
    <WithHeaderLayout>
      {exist ? (
        challenge && (
          <>
            <p>data.title : {challenge.title}</p>
            <p>data.startDate : {challenge.startDate}</p>
            <p>data.endDate : {challenge.endDate}</p>
            <p>data.description : {challenge.description}</p>
            <p>data.achievementRate : {challenge.achievementRate}</p>
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
