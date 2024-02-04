"use client";

import PilsaCard, { IPilsaCardItem } from "@/components/PilsaCard";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
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
  const [mounted, setMounted] = useState<boolean>(false);
  const [page, setPage] = useState(0);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <WithHeaderLayout>
        <div className="flex flex-col gap-y-8 mt-5 pb-5 px-4">
          <section className="flex flex-col gap-y-4">
            <h3 className="text-lg font-bold">오늘의 글감</h3>
            {todayList && todayList.pilsaLists.length !== 0 && (
              <PilsaCard pilsaInfo={todayList.pilsaLists[0]} />
            )}
          </section>
          <section className="flex flex-col gap-y-4">
            <h3 className="text-lg font-bold">추천 글감</h3>
            {recommenList &&
              recommenList.pilsaLists.length !== 0 &&
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
    )
  );
}
