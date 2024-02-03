import { IProfile } from "@/shared/contexts/AuthContext";

interface IPilsaCardProps {
  pilsaInfo: IPilsaCardItem;
}
export interface IPilsaCardItem {
  author: string;
  backgroundColor: String;
  backgroundImageUrl: string;
  categoryList: ICategoryItem[];
  memberInfoResponse: IProfile[];
  pilsaId: string;
  pilsaImages: IImageItem[];
  privateType: string;
  publisher: string;
  registDate: string;
  textContents: string;
  title: string;
  updateDate: string;
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

const PilsaCard = ({ pilsaInfo }: IPilsaCardProps) => {
  const {
    author,
    backgroundColor,
    backgroundImageUrl,
    categoryList,
    textContents,
    title,
  } = pilsaInfo;
  return (
    <div
      className={`${
        backgroundColor ? "bg-[#FFF1F1]" : -""
      } p-6 rounded-xl relative`}
    >
      {backgroundImageUrl && (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-white/40">
          <img src={backgroundImageUrl} alt="pilsaImg" />
        </div>
      )}
      <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium">
        {categoryList &&
          categoryList.map((cate) => (
            <>
              <span>{cate.categoryName}</span>
              <span className="last:hidden">∙</span>
            </>
          ))}
      </div>
      <p className="text-[#353535] font-bold mt-3 mb-4 font-Bokk-MeongJo">
        {title}
      </p>
      <p className="text-[#353535] font-light text-ellipsis h-[224px] overflow-hidden leading-7 mb-4 font-Bokk-MeongJo">
        {textContents}
      </p>
      <span className="text-sm text-[#666] font-light font-Bokk-MeongJo">
        - {author}
      </span>
    </div>
  );
};

export default PilsaCard;
