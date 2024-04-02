import React, { ReactNode, useState, ChangeEvent } from "react";

const ChallengeStep3 = () => {
  const [formData, setFormData] = useState({
    challengeTitle: "",
    challengeDescription: "",
  });
  const { challengeTitle, challengeDescription } = formData;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, challengeTitle: e.target.value });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, challengeDescription: e.target.value });
  };

  return (
    <>
      {/* step 3 */}
      <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 py-2">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-lg font-bold text-left text-[#353535]">
          챌린지 이름과 다짐은 무엇인가요 ?
        </p>
      </div>

      <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] gap-1">
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
          <p className="flex-grow-0 flex-shrink-0 text-[13px] font-bold text-left text-[#555]">
            기간
          </p>
        </div>
        <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
          <div className="flex justify-center items-center self-stretch flex-grow relative gap-2 px-3 py-4 rounded-lg bg-[#fbfbfb]">
            <p className="flex-grow-0 flex-shrink-0 text-[13px] font-semibold text-left text-[#555]">
              5일간 |
            </p>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-0.5">
                <p className="flex-grow-0 flex-shrink-0 text-[11px] text-left text-[#777]">
                  시작
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-[#777]">
                  2024.05.01
                </p>
              </div>
              <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#777]">
                ~
              </p>
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-0.5">
                <p className="flex-grow-0 flex-shrink-0 text-[11px] text-left text-[#777]">
                  종료
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-[#777]">
                  2024.05.05
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="mt-5 font-small text-[#131313] text-sm">
          챌린지 이름 <span className="text-[#eb3434]">*</span>
        </p>
        <p className="mt-5 font-small text-[#777777] text-sm">
          {challengeTitle.length} / 10
        </p>
      </div>

      <input
        type="text"
        name="challengeTitle"
        value={challengeTitle}
        onChange={handleNameChange}
        placeholder="(필수)챌린지 이름을 입력해 주세요"
        maxLength={10}
        className={`
                p-3 rounded-lg border w-full resize-none text-center text-base text-[#353535] h-[50px]`}
      />

      {/* <p className="mt-1 mb-2 font-medium text-[#eb3434] text-xs h-1">
                {isError
                  ? "닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요."
                  : ""}
              </p> */}
      <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
        다짐 한 마디
      </p>
      <textarea
        id="challengeDescription"
        maxLength={100}
        name="challengeDescription"
        value={challengeDescription}
        onChange={handleDescriptionChange}
        placeholder="다짐 한 마디를 써 보세요:)
                텍스트버킷은 당신의 필사 챌린지를 응원합니다!"
        className="border-[#e3e3e3] p-3 rounded-lg border w-full resize-none text-xs text-[#353535] h-[100px]"
      />
    </>
  );
};

export default ChallengeStep3;
