import WithHeaderLayout from "@/components/WithHeaderLayout";

export default function Home() {
  return (
    <WithHeaderLayout>
      <div className="flex flex-col gap-y-8 mt-5">
        <section className="flex flex-col gap-y-4">
          <h3 className="text-lg font-bold">오늘의 글감</h3>
          <div className="p-6 rounded-xl bg-[#FFF1F1]">
            <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium">
              <span>소설</span>
              <span>∙</span>
              <span>외국어</span>
            </div>
            <p className="text-[#353535] font-bold mt-3 mb-4">위대한 개츠비</p>
            <p className="text-[#353535] font-light text-ellipsis h-[224px] overflow-hidden leading-7 mb-4">
              Ich bitte die Kinder um Verzeihung, daß ich dieses Buch einem
              Erwachsenen widme. Ich habe eine ernstliche Entschu ldigung
              dsdafür: Dieser Erwachsene ist der beste asdFreund, den ich in der
              Welt habe. Ichden aich in der Welt haden ich in der Welt haWel ist
              der beste asd Freund, den ich in der Welt habe. Ichden as ich in
              der Welt haden ich in der Welt haWel
            </p>
            <span className="text-sm text-[#666] font-light">
              - 앙투안 드 생텍쥐페리
            </span>
          </div>
        </section>
        <section className="flex flex-col gap-y-4">
          <h3 className="text-lg font-bold">추천 글감</h3>
          <div className="p-6 rounded-xl bg-[#FDFDD0]">
            <div className="flex items-center gap-x-0.5 text-[#666666] text-sm font-medium">
              <span>소설</span>
              <span>∙</span>
              <span>외국어</span>
            </div>
            <p className="text-[#353535] font-bold mt-3 mb-4">위대한 개츠비</p>
            <p className="text-[#353535] font-light text-ellipsis h-[224px] overflow-hidden leading-7 mb-4">
              Ich bitte die Kinder um Verzeihung, daß ich dieses Buch einem
              Erwachsenen widme. Ich habe eine ernstliche Entschu ldigung
              dsdafür: Dieser Erwachsene ist der beste asdFreund, den ich in der
              Welt habe. Ichden aich in der Welt haden ich in der Welt haWel ist
              der beste asd Freund, den ich in der Welt habe. Ichden as ich in
              der Welt haden ich in der Welt haWel
            </p>
            <span className="text-sm text-[#666] font-light">
              - 앙투안 드 생텍쥐페리
            </span>
          </div>
        </section>
      </div>
    </WithHeaderLayout>
  );
}
