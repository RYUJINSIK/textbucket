"use client";
import { useState, useEffect, ChangeEvent } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ChallengePage = () => {
  const [step, setStep] = useState(1);

  const router = useRouter();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  return (
    <WithHeaderLayout>
      <div
        className="flex flex-col h-full justify-between px-4"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div>
          <div className="flex justify-between items-center w-[360px] h-14 px-4 py-3 border-t-0 border-r-0 border-b border-l-0 border-[#efefef]">
            <div className="flex justify-start items-center flex-grow relative gap-1">
              <Image
                width={24}
                height={24}
                alt="back"
                src="/icons/ibtn_back.png"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
              />
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                챌린지 만들기
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col justify-start items-start gap-2 px-4">
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5 py-0.5">
              <div className="flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] bg-[#00c37d]" />
              <div
                className={`flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] ${
                  step >= 2 ? "bg-[#00c37d]" : "bg-[#c4c4c4]"
                } `}
              />
              <div
                className={`flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] ${
                  step == 3 ? "bg-[#00c37d]" : "bg-[#c4c4c4]"
                } `}
              />
            </div>
          </div>
        </div>
        <div className={`flex items-end justify-end`}>
          <button
            type="submit"
            onClick={() => {
              if (step != 1) setStep(step - 1);
            }}
            className={`mt-5 mb-5 w-1/4 py-4 rounded-lg text-[#00C37D] text-center mr-2 
            ${step === 1 ? "hidden" : ""}
            border border-[#00C37D] text-sm font-bold`}
          >
            이전
          </button>
          {/* <button
            type="submit"
            disabled={selectedCategories.length === 0}
            onClick={() => {
              if (step < 3) setStep(step + 1);
            }}
            className={`mt-5 mb-5 py-4 rounded-lg text-white text-center ${
              selectedCategories.length === 0 ? "bg-[#E3E3E3]" : "bg-[#00C37D]"
            } ${step === 1 ? "w-full" : "w-3/4"} text-sm font-bold`}
          >
            {step === 3 ? "챌린지 시작하기" : "다음"}
          </button>
          버튼기능 다시
          */}
        </div>
      </div>
    </WithHeaderLayout>
  );
};
export default ChallengePage;
