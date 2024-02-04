"use client";
import { useState, useEffect } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/BottomSheet";
import Modal from "@/components/Modal";

interface ICategorieyList {
  categories: ICategoryItem[];
}
interface ICategoryItem {
  categoryCd: number;
  categoryName: string;
  description: string;
}

const CreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null as any,
    author: "",
    publisher: "",
    category: [] as any,
  });
  const { title, content, file, author, publisher, category } = formData;
  const [previewURL, setPreviewURL] = useState<any>(null);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);
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
        const categories = res.data.categories; // "categories" 키에서 배열을 추출
        setCategoryList(categories);
        console.log("data ? : ", categories);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  const handleCategoryClick = (category: number) => {
    // 클릭한 항목이 이미 선택되었다면 제거, 아니면 추가
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item: number) => item !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
    console.log(selectedCategories);
  };

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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/image`,
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
      backgroundImageUrl:
        imageNumber !== 0 ? `/images/bg_image${imageNumber}` : "",
      backgroundColor: "",
      categoryCd: selectedCategories,
      images: [{ imageUrl: imageUrl, thumbnail: "Y", imageSeq: 0 }],
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const imageDelete = () => {
    setFormData({ ...formData, file: null });
    setPreviewURL(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log(selectedCategories);
  };
  const closeModal = () => setIsModalOpen(false);
  const closeWarningModal = () => setShowWarningModal(false);
  const getImage = (ImageNumber: any) => {
    console.log("ImageNumber ? 🚀 : ", ImageNumber);
    setImageNumber(ImageNumber);
  };
  return (
    <>
      <WithHeaderLayout>
        <form action="" className="mt-4 px-4">
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
                  ? `url('/images/bg_image${imageNumber + 1}.png')`
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
              {Object.entries<ICategoryItem>(categoryList).map(
                ([key, category]) => (
                  <li
                    className={`px-3 py-1.5 border border-[#E3E3E3] rounded-[100px] cursor-pointer ${
                      selectedCategories.includes(category?.categoryCd)
                        ? "bg-gray-500"
                        : ""
                    }`}
                    key={key}
                    onClick={() => handleCategoryClick(category.categoryCd)}
                  >
                    <span
                      className={`text-sm text-[#999] font-light ${
                        selectedCategories.includes(category.categoryCd)
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {category.categoryName}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
          <button
            type="button"
            className="mt-10 mb-4 w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-sm font-bold"
            onClick={() => {
              if (content !== "" || file !== null) {
                file !== null ? getImageUrl : handleSubmit("");
              } else {
                setShowWarningModal(true);
              }
            }}
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

      {showWarningModal && (
        <Modal
          open={showWarningModal}
          onClose={closeWarningModal}
          title="최소한 필사 글 또는 이미지 필사 중 하나를 채워 주세요!"
          content="물론 글과 이미지 모두 담을 수 있답니다 :)"
          closeButton="알겠어요"
        />
      )}
    </>
  );
};
export default CreatePage;
