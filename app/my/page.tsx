import PilsaCard from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";

const MyPage = () => {
  return (
    <WithHeaderLayout>
      <main className="mt-4 px-4 flex flex-col gap-y-8">
        <section className="p-4 flex flex-col gap-y-3 items-center justify-center border rounded-xl border-[#EFEFEF]">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col items-center justify-center gap-y-1">
            <div className="flex items-center gap-x-1">
              <p className="font-bold text-[#131313] text-xl">김필사</p>
              <Image
                src="/icons/pencil_icon.svg"
                width={16}
                height={16}
                alt="pencil"
              />
            </div>
            <span className="text-[#777] text-xs text-center">
              하루의 끝에 그날의 내 기분에 맞춘 시 한 편을 써요
            </span>
          </div>
        </section>
        <section>
          <div className="flex">
            <h3 className="text-lg font-bold">내 필사 아카이브</h3>
            <sup className="text-xs text-[#777]">13</sup>
          </div>
          <div className="mt-3 flex flex-col gap-y-4">
            <PilsaCard />
            <PilsaCard />
          </div>
        </section>
      </main>
    </WithHeaderLayout>
  );
};

export default MyPage;
