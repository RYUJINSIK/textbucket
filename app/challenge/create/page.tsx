"use client";
import { useState, useEffect, ChangeEvent } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import ChallengeCreateStep1 from "@/components/ChallengeCreateStep1";
import ChallengeCreateStep2 from "@/components/ChallengeCreateStep2";
import ChallengeCreateStep3 from "@/components/ChallengeCreateStep3";
import Modal from "@/components/Modal";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
const ChallengeCreatePage: React.FC = () => {
  const router = useRouter();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const [step, setStep] = useState(1);
  const StepIndicator = ({ step }: { step: number }) => {
    const stepClasses = [
      "flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px]",
      "bg-[#00c37d]",
      "bg-[#c4c4c4]",
    ];

    return (
      <div className="mt-2 flex flex-col justify-start items-start gap-2 px-4">
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5 py-0.5">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`${stepClasses[0]} ${
                step >= index ? stepClasses[1] : stepClasses[2]
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const handleCategorySelect = (categories: number) => {
    setSelectedCategories(categories);
  };

  const [startDate, setStartDate] = useState<Date | any>(null);
  const [endDate, setEndDate] = useState<Date | any>(null);
  const [daysDiff, setDaysDiff] = useState<Number | any>(0);
  const [selectedInterval, setSelectedInterval] = useState<String>("");
  useEffect(() => {
    setDaysDiff(differenceInDays(endDate, startDate) + 1);
  }, [endDate]);

  const [formData, setFormData] = useState({
    challengeTitle: "",
    challengeDescription: "",
  });

  const handlePrevButtonClick = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };
  const handleNextButtonClick = () => {
    if (step < 3) {
      setStep(step + 1);
    }

    if (step === 3) {
      // api 연결
    }
  };

  const formatDateToString = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const requestBody = {
      startDate: formatDateToString(startDate),
      endDate: formatDateToString(endDate),
      title: formData.challengeTitle,
      description: formData.challengeDescription,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/challenge`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [showBackModal, setShowBackModal] = useState(false);
  const closeBackModal = () => setShowBackModal(false);
  const handleBackButtonClick = () => {
    router.push("/challenge");
  };

  const [showInfoModal, setShowInfoModal] = useState(false);
  const closeInfoModal = () => setShowInfoModal(false);

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
                onClick={() => setShowBackModal(true)}
              />
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                챌린지 만들기
              </p>
            </div>
          </div>
          <StepIndicator step={step} />

          {step === 1 && (
            <ChallengeCreateStep1
              onCategorySelect={handleCategorySelect}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          )}
          {step === 2 && (
            <ChallengeCreateStep2
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              selectedInterval={selectedInterval}
              setSelectedInterval={setSelectedInterval}
              setShowInfoModal={setShowInfoModal}
            />
          )}
          {step === 3 && (
            <ChallengeCreateStep3
              formData={formData}
              setFormData={setFormData}
              daysDiff={daysDiff}
              startDate={formatDateToString(startDate)}
              endDate={formatDateToString(endDate)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevButtonClick}
            className={`mt-5 mb-5 w-1/4 py-4 rounded-lg text-[#00C37D] text-center mr-2 
                    ${step === 1 ? "hidden" : ""}
                    border border-[#00C37D] text-base font-bold`}
          >
            이전
          </button>
          <button
            type="button"
            disabled={
              (step === 1 && selectedCategories.length === 0) ||
              (step === 3 && formData.challengeTitle.trim() === "")
            }
            onClick={handleNextButtonClick}
            className={`mt-5 mb-5 py-4 flex items-center justify-center rounded-lg text-white text-center bg-[#00C37D]
            ${step === 1 ? "w-full" : "w-3/4"} 
            ${
              (step === 1 && selectedCategories.length === 0) ||
              (step === 3 && formData.challengeTitle.trim() === "")
                ? "bg-[#E3E3E3]"
                : "bg-[#00C37D]"
            }
            
            text-base font-bold`}
          >
            <span
              className={`flex-grow-0 flex-shrink-0 text-xs font-semibold text-left text-white bg-[#00945F] rounded-full p-1 pl-3 pr-3 mr-1 ${
                step === 2 && endDate !== null ? "" : "hidden"
              }`}
            >
              {daysDiff}일간
            </span>
            {step === 3 ? "챌린지 시작하기" : "다음"}
          </button>
        </div>
      </div>
      {showBackModal && (
        <Modal
          open={showBackModal}
          onClose={closeBackModal}
          title="챌린지 만들기를 그만두시겠어요?"
          content="저장되지 않아요."
          confirmButton="그만두기"
          closeButton="취소"
          confirmEvent={handleBackButtonClick}
        />
      )}
      {showInfoModal && (
        <Modal
          open={showInfoModal}
          onClose={closeInfoModal}
          title="오늘 이후 날짜를 선택해 주세요"
          closeButton="확인"
        />
      )}
    </WithHeaderLayout>
  );
};
export default ChallengeCreatePage;
