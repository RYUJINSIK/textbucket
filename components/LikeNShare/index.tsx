import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type LikeNShareProps = {
  pilsaId: string;
  liked: boolean;
  title: string;
  description: string;
};

const LikeNShare = ({
  pilsaId,
  liked,
  title,
  description,
}: LikeNShareProps) => {
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
  const [isLiked, setIsLiked] = useState(false);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  useEffect(() => {
    setIsLiked(liked);
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/like/${pilsaId}`,
        {
          pilsaId: pilsaId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border-t border-[EFEFEF] py-3 px-5 w-full flex items-start justify-between sticky bottom-0 left-0">
      <Image
        onClick={handleShare}
        src="/icons/share.png"
        width={20}
        height={20}
        alt="kakaotalkshare"
        className="cursor-pointer"
      />
      {isLiked ? (
        <Image
          onClick={handleLike}
          src="/icons/bookmark_added.png"
          width={20}
          height={20}
          alt="bookmark"
          className="cursor-pointer"
        />
      ) : (
        <Image
          onClick={handleLike}
          src="/icons/bookmark.png"
          width={20}
          height={20}
          alt="bookmark"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LikeNShare;
