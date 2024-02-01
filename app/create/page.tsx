import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";

const CreatePage = () => {
  const categoryList = [
    "시",
    "산문",
    "소설",
    "인문",
    "글귀",
    "확언",
    "외국어",
    "성경",
    "기타",
  ];
  return (
    <WithHeaderLayout>
      <form action="" className="mt-4">
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
          <input
            type="text"
            className="text-xl bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="제목"
          />
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <button className="inline-flex items-center justify-center w-full p-4 rounded-lg bg-[#EBEBEB] gap-x-1">
          <Image
            src="/icons/camera_icon.png"
            width={16}
            height={16}
            alt="camera"
          />
          <span className="text-[#6D6D6D] text-sm font-medium">
            사진으로 필사 올리기 (1장)
          </span>
        </button>
        <div className="my-3 rounded-xl py-5 px-4 h-[224px] w-full bg-[#F8F8F8]">
          <textarea
            name="content"
            id="content"
            className="bg-transparent w-full h-full resize-none focus:outline-none text-sm placeholder-[#999]"
            placeholder="필사 글 또는 이미지 필사의 내 생각을 입력해 주세요."
          />
        </div>
        <p className="text-xs text-[#777]">
          * 필사 글 또는 이미지 중 하나는 채워주세요! (워딩 변경 예정)
        </p>
        <hr className="my-4 border-[#EFEFEF]" />
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
          <input
            type="text"
            className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="출처(저자)"
          />
        </div>
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8] mt-4">
          <input
            type="text"
            className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="출판사"
          />
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex items-center gap-x-0.5">
            <p className="text-sm text-[#777] font-semibold">카테고리</p>
            <span className="text-xs text-[#777]">(최대3개)</span>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-2.5 px-2">
            {categoryList.map((category) => (
              <li
                className="px-3 py-1.5 border border-[#E3E3E3] rounded-[100px]"
                key={category}
              >
                <span className="text-sm text-[#999] font-light">
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <ul className="py-4 flex items-center justify-center px-2 gap-x-2.5">
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
        </ul>
        <hr className="h-0.5 border-[#EFEFEF]" />
        <button
          type="submit"
          className="mt-10 mb-4 w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-sm font-bold"
        >
          필사 올리기
        </button>
      </form>
    </WithHeaderLayout>
  );
};
export default CreatePage;
