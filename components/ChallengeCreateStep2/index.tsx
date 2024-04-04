import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
// 달력
import {
  format,
  addMonths,
  addWeeks,
  addDays,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isWithinInterval,
  isSameDay,
  differenceInDays,
} from "date-fns";

const ChallengeStep2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | any>(null);
  const [endDate, setEndDate] = useState<Date | any>(null);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [isCustomSelecting, setIsCustomSelecting] = useState<boolean>(false);
  const [selectedInterval, setSelectedInterval] = useState<String>("1week");
  const dueDate = [
    { label: "1주", interval: "1week" },
    { label: "2주", interval: "2week" },
    { label: "30일", interval: "30days" },
    { label: "직접설정", interval: "self" },
  ];

  useEffect(() => {
    const weekLater = addWeeks(new Date(), 1);
    setStartDate(new Date());
    setEndDate(weekLater);
    setIsCustomSelecting(false);
  }, []);

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    if (isCustomSelecting) {
      if (!startDate) {
        setStartDate(date);
        setEndDate(null);
      } else if (!endDate && date >= startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }

      if (startDate && endDate) {
        const daysDiff = differenceInDays(endDate, startDate) + 1;
        console.log("Selected days: ", daysDiff);
      }
    }
  };

  const isWithinSelectedRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return (
      isSameDay(date, startDate) ||
      isSameDay(date, endDate) ||
      (date > startDate && date < endDate)
    );
  };

  const handleIntervalClick = (interval: String) => {
    setSelectedInterval(interval);
    // 나머지 버튼의 선택 상태를 해제
    dueDate.forEach((d) => {
      if (d.interval !== interval) {
        document.getElementById(d.interval)?.classList.remove("bg-blue-200");
      }
    });
    switch (interval) {
      case "1week":
        // 1주 처리 로직
        const weekLater = addWeeks(new Date(), 1);
        setStartDate(new Date());
        setEndDate(weekLater);
        setIsCustomSelecting(false);
        break;
      case "2week":
        // 2주 처리 로직
        const twoWeeksLater = addWeeks(new Date(), 2);
        setStartDate(new Date());
        setEndDate(twoWeeksLater);
        setIsCustomSelecting(false);
        break;
      case "30days":
        // 30일 처리 로직
        const thirtyDaysLater = addDays(new Date(), 30);
        setStartDate(new Date());
        setEndDate(thirtyDaysLater);
        setIsCustomSelecting(false);
        break;
      case "self":
        setIsCustomSelecting(true);
        break;
      default:
        break;
    }
  };

  const renderCalendar = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="rounded h-full w-full mt-3">
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[328px] relative gap-6 mb-3">
          <Image
            width={24}
            height={24}
            alt="back"
            src="/icons/ibtn_back.png"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
            onClick={goToPreviousMonth}
          />

          <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left text-[#353535]">
            {format(currentDate, "yyyy. M")}
          </p>

          <Image
            width={24}
            height={24}
            alt="back"
            src="/icons/ibtn_next.png"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
            onClick={goToNextMonth}
          />
        </div>

        <div className="flex items-center justify-center grid grid-cols-7 m-3 px-3 py-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center text-center text-[#b3b3b3] text-sm mb-3"
            >
              {day}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day.getTime()}
              onClick={() => handleDateClick(day)}
              className={`flex items-center justify-center text-center text-sm w-12 h-12 cursor-pointer mb-1 ${
                isSameMonth(day, currentDate) ? "" : "text-gray-400"
              } 
              ${
                isSameDay(day, startDate)
                  ? "bg-[#00c37d] text-[#fff] rounded-l-lg"
                  : ""
              } 
              ${
                isSameDay(day, endDate)
                  ? "bg-[#00c37d] text-[#fff] rounded-r-lg"
                  : ""
              }
              ${
                isWithinSelectedRange(day) &&
                !isSameDay(day, startDate) &&
                !isSameDay(day, endDate)
                  ? "bg-[#80e1be]"
                  : ""
              }
              `}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* step 2 */}
      <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 py-2">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-lg font-bold text-left text-[#353535]">
          얼마동안 챌린지 할까요 ?
        </p>
      </div>
      <div className="grid gap-1.5 grid-cols-2 grid-rows-2">
        {dueDate &&
          dueDate.map((dueDate) => (
            <div
              onClick={() => handleIntervalClick(dueDate.interval)}
              className={`flex justify-center items-center flex-grow-0 flex-shrink-0 w-40 h-[49px] relative gap-2.5 p-4 rounded-xl border border-[#e3e3e3] ${
                selectedInterval === dueDate.interval ? "bg-[#00C37D]" : ""
              }`}
              id={dueDate.interval}
              key={dueDate.interval}
            >
              <p
                className={`flex-grow-0 flex-shrink-0 text-sm text-left  ${
                  selectedInterval === dueDate.interval
                    ? "text-[#fff]"
                    : "text-[#353535]"
                }`}
              >
                {dueDate.label}
              </p>
            </div>
          ))}
      </div>
      <div className="w-full">{renderCalendar()}</div>
      {/* step 2 */}
    </>
  );
};

export default ChallengeStep2;
