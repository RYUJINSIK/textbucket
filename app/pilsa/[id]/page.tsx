import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";

const PilsaDetailPage = () => {
  return (
    <WithHeaderLayout>
      <main className="pt-6 flex flex-col gap-y-5 pb-12 bg-pink-50 px-4">
        <section className="py-1 flex items-center gap-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col">
            <p className="text-[#131313] font-bold">김필사</p>
            <span className="text-xs text-[#666]">방금</span>
          </div>
        </section>
        <section>
          <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium">
            <span>소설</span>
            <span>∙</span>
            <span>외국어</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg text-[#353535] font-bold">
              어린왕자 인상깊은 구절 1
            </p>
            <div className="">
              <Image
                src="/icons/more_vertical_icon.svg"
                alt="more"
                width={24}
                height={24}
              />
            </div>
          </div>
        </section>
        <section>
          <p className="text-[#353535] font-light">
            Ich bitte die Kinder um Verzeihung, daß ich dieses Buch einem
            Erwachsenen widme. Ich habe eine ernstliche Entschu ldigung dsdafür:
            Dieser Erwachsene ist der beste asdFreund, den ich in der Welt habe.
            Ichden aich in der Welt haden ich in der Welt haWel ist der beste
            asd. Freund, den ich in der Welt habe. Ichden as ich in der Welt
            haden ich in der Welt haWelIch bitte die Kinder um Verzeihung, daß
            ich dieses Buch einem Erwachsenen widme. Ich habe eine ernstliche
            Entschu ldigung dsdafür: Dieser Erwachsene ist der beste asdFreund,
            den ich in der Welt habe. Ichden aich in der Welt haden ich in der
            Welt haWel ist der beste asd Freund, den ich in der Welt habe.
            Ichden as ich in der Welt haden ich in der Welt haWel
          </p>
        </section>
        <div className="flex text-[#666] text-xs font-light">
          <p>앙투안 드 생텍쥐페리</p>|<p>학지사</p>
        </div>
      </main>
      <footer className="bg-white border-t border-[EFEFEF] py-3 px-5 w-full flex items-start justify-between">
        <div className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            <Image
              src="/icons/arrow_left_icon.svg"
              alt="left"
              width={16}
              height={16}
            />
            <span className="text-sm text-[#999]">이전</span>
          </div>
          <p className="text-[#777] text-sm">위대한 개츠비</p>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            <p className="text-[#777] text-sm">위대한 개츠비</p>
            <span className="text-sm text-[#999]">다음</span>
            <Image
              src="/icons/arrow_right_icon.svg"
              alt="left"
              width={16}
              height={16}
            />
          </div>
        </div>
      </footer>
    </WithHeaderLayout>
  );
};
export default PilsaDetailPage;
