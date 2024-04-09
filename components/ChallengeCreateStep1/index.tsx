import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  onCategorySelect: (categories: number) => void;
  selectedCategories: any;
  setSelectedCategories: React.Dispatch<React.SetStateAction<any>>;
}

const ChallengeStep1: React.FC<Props> = ({
  onCategorySelect,
  selectedCategories,
  setSelectedCategories,
}) => {
  interface ICategoryItem {
    categoryCd: number;
    categoryName: string;
    description: string;
  }

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  // const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/category`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const categories = res.data.categories;
        setCategoryList(categories);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  const handleCategoryClick = (category: number) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item: number) => item !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  // 선택된 카테고리 변경 시 상위 컴포넌트에 전달
  useEffect(() => {
    onCategorySelect(selectedCategories);
  }, [selectedCategories, onCategorySelect]);

  return (
    <>
      <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 py-2">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-lg font-bold text-left text-[#353535]">
          어떤 필사를 도전할까요?
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-xs text-left text-[#777]">
          최대 3개까지 선택할 수 있어요
        </p>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[328px] h-full gap-2 px-2 rounded-xl">
          <ul className="flex flex-wrap items-center justify-center gap-2.5 px-2">
            {Object.entries<ICategoryItem>(categoryList).map(
              ([key, category]) => (
                <li
                  className={`px-3 py-1.5 border border-[#E3E3E3] rounded-[100px] cursor-pointer ${
                    selectedCategories.includes(category?.categoryCd)
                      ? "bg-[#00C37D]"
                      : ""
                  }`}
                  key={key}
                  onClick={() => handleCategoryClick(category.categoryCd)}
                >
                  <span
                    className={`text-sm text-[#999] ${
                      selectedCategories.includes(category.categoryCd)
                        ? "text-white font-semibold"
                        : "font-light"
                    }`}
                  >
                    {category.categoryName}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChallengeStep1;
