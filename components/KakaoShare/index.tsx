import React, { useEffect } from "react";
import Image from "next/image";

type KakaoShareButtonProps = {
  title: string;
  description: string;
};

const KakaoShareButton = ({ title, description }: KakaoShareButtonProps) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl:
          "https://kr.object.ncloudstorage.com/pilsa-image/pilsa-content/cdf5b581-9b17-4e50-bf7a-ae372dcc3bb9.shareImage.png",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    });
  };

  return (
    <div
      onClick={handleShare}
      className="w-9 h-9 cursor-pointer z-10 flex justify-center items-center rounded-full bg-[#F5E14B]"
    >
      <Image src="/icons/kakao_icon.png" width={20} height={20} alt="kakao" />
    </div>
  );
};

export default KakaoShareButton;
