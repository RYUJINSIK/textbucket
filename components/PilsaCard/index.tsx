"use client";

import { IProfile } from "@/shared/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";

interface IPilsaCardProps {
  pilsaInfo: IPilsaCardItem;
  hasDetail?: boolean;
}
export interface IPilsaCardItem {
  author: string;
  backgroundColor: string;
  backgroundImageUrl: string;
  categoryLists: ICategoryItem[];
  memberInfoResponse: IProfile;
  pilsaId: string;
  pilsaImages: IImageItem[];
  privateType: string;
  publisher: string;
  registDate: string;
  textContents: string;
  title: string;
  updateDate: string;
  isNextPilsa: boolean;
  isPreviousPilsa: boolean;
  nextPilsa: {
    pilsaId: number;
    title: string;
  };
  previousPilsa: {
    pilsaId: number;
    title: string;
  };
}
export interface ICategoryItem {
  categoryCd: number;
  categoryName: string;
  description: string;
}
export interface IImageItem {
  imageUrl: string;
  thubnail: string;
  imageSeq: number;
}

const PilsaCard = ({ pilsaInfo, hasDetail = true }: IPilsaCardProps) => {
  const {
    author,
    backgroundColor,
    backgroundImageUrl,
    categoryList,
    textContents,
    title,
    pilsaId,
  } = pilsaInfo;
  const router = useRouter();
  const pathName = usePathname();

  const goToDetailPage = () => {
    const isMypage = pathName.includes("my");
    hasDetail &&
      (isMypage
        ? router.push(`/my/${pilsaId}`)
        : router.push(`/pilsa/${pilsaId}`));
  };
  return (
    <div
      className={`p-6 rounded-xl relative cursor-pointer z-10 ${
        backgroundImageUrl ? "" : "bg-[#F4F0FF] odd:bg-[#FDFDD0]"
      }`}
      onClick={goToDetailPage}
    >
      {backgroundImageUrl && (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-white/40 rounded-xl overflow-hidden">
          <img
            src={`${backgroundImageUrl}.png`}
            alt="pilsaImg"
            className="w-full h-full"
          />
        </div>
      )}
      {backgroundColor && (
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ backgroundColor: backgroundColor }}
        ></div>
      )}
      <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium relative z-10">
        {categoryList &&
          categoryList.map((cate) => (
            <>
              <span>{cate.categoryName}</span>
              <span className="last:hidden">∙</span>
            </>
          ))}
      </div>
      <p className="text-[#353535] font-bold mt-3 mb-4 font-Bokk-MeongJo relative z-10">
        {title}
      </p>
      <p className="text-[#353535] font-light text-ellipsis h-[224px] overflow-hidden leading-7 mb-4 font-Bokk-MeongJo relative z-10">
        {textContents}
      </p>
      <span className="text-sm text-[#666] font-light font-Bokk-MeongJo relative z-10">
        - {author}
      </span>
    </div>
  );
};

export default PilsaCard;
