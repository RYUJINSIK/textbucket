import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import Image from "next/image";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  author?: string;
  publisher?: string;
  category?: any;
  confirmButton?: ReactNode;
  closeButton?: ReactNode;
  getImage?: (imageNumber: any) => void;
}

const BottomSheet = ({
  open,
  onClose,
  title,
  content,
  author,
  publisher,
  category,
  confirmButton,
  closeButton,
  getImage,
}: BottomSheetProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageCount = 25;

  const handleImageClick = (index: any) => {
    setSelectedImage(index);
    console.log(selectedImage);
  };

  const sendImage = () => {
    console.log(selectedImage);
    onClose();
    getImage?.(selectedImage);
  };
  const imageDataSend = () => {};
  const groupedImages = Array.from(
    { length: Math.ceil(imageCount / 5) },
    (_, groupIndex) =>
      Array.from({ length: 5 }, (_, innerIndex) => groupIndex * 5 + innerIndex)
  );

  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[60]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[70] w-[360px] rounded-xl">
        <div className="flex flex-col items-center justify-center py-3 gap-y-2">
          <h2 className="font-semibold">카드꾸미기</h2>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[360px] gap-2 px-4 bg-white pb-2">
          <div
            className={`flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-[328px] relative gap-4 p-6 rounded-xl `}
            style={{
              backgroundImage:
                selectedImage !== null
                  ? `url('/images/bg_image${selectedImage + 1}.jpg')`
                  : "none",
              backgroundSize: "cover", // 배경 이미지 크기 조절 (선택적)
            }}
          >
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5">
                {category.map((categoryItem: any, index: any) => (
                  <p
                    key={index}
                    className="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left text-[#666]"
                  >
                    {categoryItem}
                  </p>
                ))}
              </div>
              <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#353535]">
                {title}
              </p>
            </div>
            <pre>{content}</pre>
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-[280px] text-[11px] font-light text-left text-[#666]">
                - {author} - {publisher}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[360px] h-[170px] overflow-auto gap-2 p-4 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#e3e3e3]">
          <div className="justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] relative gap-2">
            {groupedImages.map((group, groupIndex) => (
              <div key={groupIndex} className="flex gap-2 pb-2">
                {group.map((index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer `}
                    onClick={() => handleImageClick(index)}
                  >
                    {/* 이미지를 가져오는 로직을 추가하세요 */}
                    <Image
                      src={`/images/bg_image${index + 1}.jpg`} // 예제로 사용한 임시 이미지 URL
                      alt={`Image ${index + 1}`}
                      width={60}
                      height={60}
                      className={`w-[60px] h-[60px] rounded-lg opacity-60  ${
                        selectedImage === index
                          ? "border-2 rounded-lg border-black	"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${
            confirmButton ? "grid-cols-2" : "grid-cols-1"
          } grid py-4`}
        >
          {closeButton && (
            <button
              onClick={() => {
                onClose();
                setSelectedImage(null);
              }}
              className="font-semibold text-sm"
            >
              {closeButton}
            </button>
          )}

          {confirmButton && (
            <div className="relative flex items-center justify-center">
              <button className="font-semibold text-sm" onClick={sendImage}>
                {confirmButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
