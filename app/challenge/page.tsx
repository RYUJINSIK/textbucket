"use client";
import WithHeaderLayout from "@/components/WithHeaderLayout";

const ChallengePage = () => {
  return (
    <WithHeaderLayout>
      <div className="grid place-items-center h-full">
        <div className="flex flex-col justify-center items-center w-[328px] h-[494px] relative gap-2.5 p-4 rounded-xl bg-[#e6fff6]">
          <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-black">
            <span className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-black">
              {" "}
              📅{" "}
            </span>
            <br />
            <span className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-black">
              챌린지 기간을 설정하고{" "}
            </span>
            <br />
            <span className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-black">
              기간동안 필사를 진행해 보세요 :)
            </span>
          </p>
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[51px] relative gap-1 px-6 py-4 rounded-xl bg-[#00c37d]">
            <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-white">
              챌린지 만들기
            </p>
          </div>
        </div>
      </div>
    </WithHeaderLayout>
  );
};
export default ChallengePage;
