// import React, { useEffect } from "react";
// import Image from "next/image";

// type KakaoShareButtonProps = {
//   title: string;
//   description: string;
// };

// const KakaoShareButton = ({ title, description }: KakaoShareButtonProps) => {
//   const shareUrl = typeof window !== "undefined" ? window.location.href : "";

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const { Kakao } = window;

//       if (!Kakao.isInitialized()) {
//         Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
//       }
//     }
//   }, []);

//   const handleShare = () => {
//     const { Kakao } = window;

//     Kakao.Share.sendDefault({
//       objectType: "feed",
//       content: {
//         title: title,
//         description: description,
//         imageUrl:
//           "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         link: {
//           mobileWebUrl: shareUrl,
//           webUrl: shareUrl,
//         },
//       },
//     });
//   };

//   return (
//     <div
//       onClick={handleShare}
//       className="w-9 h-9 cursor-pointer z-10 flex justify-center items-center rounded-full bg-[#F5E14B]"
//     >
//       <Image src="/icons/kakao_icon.png" width={20} height={20} alt="kakao" />
//     </div>
//   );
// };

// export default KakaoShareButton;
