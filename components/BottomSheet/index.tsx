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
  const imageCount = 22;

  const handleImageClick = (index: any) => {
    setSelectedImage(index);
    console.log(selectedImage);
  };

  const sendImage = () => {
    console.log(selectedImage);
    onClose();
    getImage?.(selectedImage);
  };
  const groupedImages = Array.from(
    { length: Math.ceil(imageCount / 5) },
    (_, groupIndex) =>
      Array.from({ length: 5 }, (_, innerIndex) => groupIndex * 5 + innerIndex)
  );

  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[60]" />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white z-[70] w-full max-w-[390px] rounded-t-xl">
        <div className="flex flex-col items-center justify-center py-4">
          <h2 className="font-bold">카드꾸미기</h2>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-2 px-4 bg-white pb-2">
          <div
            className={`flex flex-col relative gap-4 p-6 rounded-xl border`}
            style={{
              backgroundImage:
                selectedImage !== null
                  ? `url('/images/bg_image${selectedImage + 1}.png')`
                  : "none",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
              <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium">
                <p>소설</p>
              </div>
              <p className="text-[#353535] font-bold font-Bokk-MeongJo">
                나는 나로살기로 헀다
              </p>
            </div>
            <p className="text-[#353535] font-light text-ellipsis overflow-hidden leading-7 mb-4 font-Bokk-MeongJo">
              Ich bitte die Kinder um Verzeihung, daß ich dieses Buch einem
              Erwachsenen widme. Ich habe eine ernstliche Entschu ldigung
              dsdafür: Dieser Erwa
            </p>
            <span className="text-sm text-[#666] font-light font-Bokk-MeongJo">
              - 앙투안 드 생텍쥐페리
            </span>
          </div>
        </div>

        <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 w-full h-[170px] overflow-auto gap-2 p-4 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#e3e3e3]">
          <div className="justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] relative gap-2">
            {groupedImages.map((group, groupIndex) => (
              <div key={groupIndex} className="flex gap-2 pb-2">
                {group.map((index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer`}
                    onClick={() => handleImageClick(index)}
                  >
                    {/* 이미지를 가져오는 로직을 추가하세요 */}
                    {index < imageCount && (
                      <Image
                        src={`/images/bg_image${index + 1}.png`} // 예제로 사용한 임시 이미지 URL
                        alt={`Image ${index + 1}`}
                        width={60}
                        height={60}
                        className={`w-[60px] h-[60px] rounded-lg ${
                          selectedImage === index
                            ? "border-2 rounded-lg border-black	"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex px-4 py-3 gap-x-2 items-center">
          {closeButton && (
            <button
              onClick={() => {
                onClose();
                setSelectedImage(null);
              }}
              className="font-bold text-sm border inline-flex items-center justify-center text-[#00C37D] py-4 border-[#00C37D] w-[128px] rounded-lg"
            >
              {closeButton}
            </button>
          )}

          {confirmButton && (
            <div className="relative flex items-center justify-center w-full py-4 rounded-lg bg-[#00C37D]">
              <button
                className="font-bold text-sm text-white"
                onClick={sendImage}
              >
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
