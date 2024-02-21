import React, { useEffect, useState } from "react";
import axios from "axios";

type LikeButtonProps = {
  pilsaId: string;
  liked: boolean;
};

const LikeButton = ({ pilsaId, liked }: LikeButtonProps) => {
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
    <div
      onClick={handleLike}
      className={`w-9 h-9 cursor-pointer z-10 flex justify-center items-center rounded-full mr-1 text-white text-xl ${
        isLiked ? `bg-[#00C37D]` : `bg-[#C8C8C8]`
      }  `}
    >
      ♥ {isLiked}
    </div>
  );
};

export default LikeButton;
