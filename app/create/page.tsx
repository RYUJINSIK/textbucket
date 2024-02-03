"use client";
import { useState } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";
import axios from "axios";
import BottomSheet from "@/components/BottomSheet";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null as any,
    author: "",
    publisher: "",
    category: [] as any,
  });
  const [previewURL, setPreviewURL] = useState<any>(null);

  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const handleCategoryClick = (category: string) => {
    // 클릭한 항목이 이미 선택되었다면 제거, 아니면 추가
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item: string) => item !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const { title, content, file, author, publisher, category } = formData;

  const handleInputChange = (event: {
    target: { name: any; files?: any; value?: any };
  }) => {
    if (event.target.name === "filename") {
      setFormData({ ...formData, file: event.target.files[0] });
      const previewURL = URL.createObjectURL(event.target.files[0]);
      setPreviewURL(URL.createObjectURL(event.target.files[0]));
    } else if (event.target.name === "category") {
      console.log("카테고리 입력");
    } else {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const getImageUrl = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const imageData = new FormData();
    imageData.append("files", formData.file);
    console.log(formData.file);

    try {
      const response = await axios.post(
        "http://223.130.135.113:8080/api/v1/image",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSubmit(response.data[0].imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (imageUrl: string) => {
    const requestBody = {
      title: title,
      author: author,
      publisher: publisher,
      textContents: content,
      backgroundImageUrl: `/images/bg_image${imageNumber}`,
      backgroundColor: "",
      categoryCd: selectedCategories,
      images: [{ imageUrl: imageUrl, thumbnail: "Y", imageSeq: 0 }],
    };
    try {
      const response = await axios.post(
        "http://223.130.135.113:8080/api/v1/pilsa",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("필사 작성이 완료되었습니다.");
      // 이후 페이지 전환
      document.location.href = "/";
    } catch (error) {
      console.error(error);
    }

    alert("stop");
  };

  const imageDelete = () => {
    setFormData({ ...formData, file: null });
    setPreviewURL(null);
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    console.log(selectedCategories);
  };
  const closeModal = () => setIsModalOpen(false);

  const [imageNumber, setImageNumber] = useState(0);
  const getImage = (ImageNumber: any) => {
    console.log("ImageNumber ? 🚀 : ", ImageNumber);
    setImageNumber(ImageNumber);
  };
  return (
    <>
      <WithHeaderLayout>
        <form action="" className="mt-4">
          <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
            <input
              type="text"
              className="text-xl bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
              placeholder="제목"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <hr className="my-4 border-[#EFEFEF]" />

          {formData.file !== null
            ? previewURL && (
                <div className="w-full h-[260px] relative ">
                  <Image
                    src={previewURL}
                    alt="미리보기"
                    width={0}
                    height={0}
                    className="w-full h-[260px] absolute top-[-1px] rounded-lg object-cover"
                  />
                  <div
                    className="cursor-pointer flex justify-start items-start absolute left-[300px] top-[210px] gap-2.5 p-2 rounded bg-white"
                    style={{ boxShadow: "0px 0px 8px 0 rgba(0,0,0,0.15)" }}
                    onClick={imageDelete}
                  >
                    <Image
                      src="/icons/trashcan_icon.png"
                      width={24}
                      height={24}
                      alt="이미지삭제"
                      className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                    />
                  </div>
                </div>
              )
            : ""}

          <div
            className="my-3 rounded-xl py-5 px-4 h-[224px] w-full bg-[#F8F8F8] "
            style={{
              backgroundImage:
                imageNumber !== null
                  ? `url('/images/bg_image${imageNumber + 1}.jpg')`
                  : "none",
              backgroundSize: "cover", // 배경 이미지 크기 조절 (선택적)
            }}
          >
            <textarea
              name="content"
              id="content"
              className="bg-transparent w-full h-full resize-none focus:outline-none text-sm placeholder-[#999]"
              placeholder="필사 글 또는 이미지 필사의 내 생각을 입력해 주세요."
              value={content}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center justify-center w-2/12 p-4 pt-5 rounded-lg bg-[url('/icons/palette_background.png')] gap-x-1 cursor-pointer text-white"
            >
              <Image
                src="/icons/palette.png"
                width={24}
                height={24}
                alt="카드꾸미기"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
              />
            </button>
            <label
              htmlFor="imageUpload"
              className="inline-flex items-center justify-center w-10/12	 p-4 pt-5 rounded-lg bg-[#EBEBEB] gap-x-1 cursor-pointer"
            >
              <Image
                src="/icons/camera_icon.png"
                width={16}
                height={16}
                alt="camera"
              />
              <span className="text-[#6D6D6D] text-sm font-medium">
                사진으로 필사 올리기 (1장)
              </span>
              <input
                type="file"
                id="imageUpload"
                className="hidden" // 파일 입력 요소를 숨깁니다.
                name="filename"
                accept="image/*"
                onChange={handleInputChange} // 파일이 변경되었을 때 호출될 핸들러 함수
              />
            </label>
          </div>

          <p className="text-xs text-[#777] pt-3">
            * 최소한, 필사 글 또는 이미지 중 하나는 채워 주세요!
          </p>
          <hr className="my-4 border-[#EFEFEF]" />
          <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
            <input
              type="text"
              className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
              placeholder="출처(저자)"
              name="author"
              value={author}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8] mt-4">
            <input
              type="text"
              className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
              placeholder="출판사"
              name="publisher"
              value={publisher}
              onChange={handleInputChange}
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
                  className={`px-3 py-1.5 border border-[#E3E3E3] rounded-[100px] cursor-pointer ${
                    selectedCategories.includes(category) ? "bg-gray-500" : ""
                  }`}
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  <span
                    className={`text-sm text-[#999] font-light ${
                      selectedCategories.includes(category) ? "text-white" : ""
                    }`}
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="mt-10 mb-4 w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-sm font-bold"
            onClick={getImageUrl}
          >
            필사 올리기
          </button>
        </form>
      </WithHeaderLayout>
      <BottomSheet
        open={isModalOpen}
        onClose={closeModal}
        title={title}
        content={content}
        author={author}
        publisher={publisher}
        category={selectedCategories}
        confirmButton="적용하기"
        closeButton="취소"
        getImage={getImage}
      />
    </>
  );
};
export default CreatePage;
