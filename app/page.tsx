"use client";

import PilsaCard, { IPilsaCardItem } from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IPilsaList {
  totalCount: number;
  pilsaLists: IPilsaCardItem[];
}

export default function Home() {
  const [todayList, setTodayList] = useState<IPilsaList | undefined>(undefined);
  const [recommenList, setRecommenList] = useState<IPilsaList | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchTodayPilsaLIst = async () => {
    const res = await axios.get<IPilsaList>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/list?page=${page}&size=${pageSize}`
    );
    if (res.status === 200) {
      setTodayList(res.data);
      return res.data;
    }
  };
  const fetchRecommendPilsaLIst = async () => {
    const res = await axios.get<IPilsaList>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/basic/contents/list?page=${page}&size=${pageSize}`
    );
    if (res.status === 200) {
      setRecommenList(res.data);
      return res.data;
    }
  };

  useEffect(() => {
    fetchTodayPilsaLIst();
    fetchRecommendPilsaLIst();
  }, []);

  return (
    <WithHeaderLayout>
      <div className="flex flex-col gap-y-8 my-5">
        <section className="flex flex-col gap-y-4">
          <h3 className="text-lg font-bold">오늘의 글감</h3>
          {todayList &&
            todayList.pilsaLists.map((pilsaInfo: IPilsaCardItem) => (
              <PilsaCard pilsaInfo={pilsaInfo} key={pilsaInfo.pilsaId} />
            ))}
        </section>
        <section className="flex flex-col gap-y-4">
          <h3 className="text-lg font-bold">추천 글감</h3>
          {recommenList &&
            recommenList.pilsaLists.map((pilsaInfo: IPilsaCardItem) => (
              <PilsaCard
                pilsaInfo={pilsaInfo}
                key={pilsaInfo.pilsaId}
                hasDetail={false}
              />
            ))}
        </section>
      </div>
    </WithHeaderLayout>
  );
}
